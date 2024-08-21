import { useEffect, useState, createContext } from "react";
import axiosConfig from "../config/axios";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { mapRoute } from "../assets/mapData";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [allParcels, setAllParcels] = useState([]);
  const [oriData, setOriData] = useState([])
  const [role, setRole] = useState(null);
  const [user, setUser] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(null);
  const [result, setResult] = useState(allParcels);
  const [search, setSearch] = useState("");
  const [assignedParcels, setAssignedParcels] = useState([]);
  const [availableParcels, setAvailableParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username , setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [filtered, setFiltered] = useState([]);

  const navi = useNavigate();




  //fetch all parcels when first load eventhough user didnt login so they able to track
  const fetchParcel = async () => {
    try {
      const allData = await axiosConfig.get("/admin/data");
      if (allData.status === 200) {

        //arranged data in pages to display pagination
        const arrangedParcel = []
        let pageNo = 1
        const database = allData.data.sortedDatabase
        setOriData(database)
          if(arrangedParcel.length === 0){
            arrangedParcel.push({page : pageNo, data : []})
          }
          for(let i = 0 ; i < database.length ; i++) {
            if(i % 10 === 0 && i !== 0){
              pageNo ++
              arrangedParcel.push({ page: pageNo, data: [] });
            }
            if(arrangedParcel[pageNo - 1]) {
              arrangedParcel[pageNo-1].data.push(database[i])
            }
          }
          return setAllParcels(arrangedParcel)
      }
    } catch (err) {
      console.log(err);
    }
  };

  //fetch delivery parcel when user logged in
  const fetchDeliveryParcels = async () => {
    try {
      const response = await axiosConfig.get(`/deliveryguy/parcels`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      const { assignedParcels, availableParcels } = response.data;
      setAssignedParcels(assignedParcels);
      setAvailableParcels(availableParcels);
    } catch (e) {
      console.log(e);
    }
  };

    //retrieve user profile from backend once logged in and display on navBar
    const fetchUser = async () => {
      try {
        const userRes = await axiosConfig.get("/user/user", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        if (userRes.status === 200) {
          setUser(userRes.data.firstName);
        }
      } catch (e) {
        console.log(e);
      }
    };

 // Fetch parcels data based on role
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const roleToken = sessionStorage.getItem("role");
      const token = sessionStorage.getItem("token");

      if (roleToken && token) {
        await fetchUser()
        setIsLoggedin(true);
        setRole(roleToken);
        if (roleToken === "deliveryguy") {
          await fetchDeliveryParcels();
        } else {
          await fetchParcel();
        }
      } else {
        setIsLoggedin(false);
        setRole(null);
      }
      setLoading(false);
    };

    fetchData(); // Fetch data on component mount
  }, [navi]);

  


  //when user enter tracking no. in the searchBar, redirect them to relavent page and display the details data
  const handleSearch = async (track) => {
    setLoading(true)
    setResult("");
    if (allParcels.length === 0) {
      await fetchParcel();
    }
    const searchResult = oriData.filter(
      (item) => track === String(item.trackingNo)
    );
    if (searchResult.length === 0) {
      setSearch("");
      navi(`/track/${track}`);
      setLoading(false);
      return;
    }
    setResult(searchResult);
    setSearch("");
    navi(`/track/${track}`);

    setLoading(false);
  };

  const values = {
    user,
    role,
    setUser,
    setRole,
    allParcels,
    setAllParcels,
    oriData,
    isLoggedin,
    setIsLoggedin,
    fetchParcel,
    result,
    setResult,
    handleSearch,
    search,
    setSearch,
    mapRoute,
    loading,
    assignedParcels,
    availableParcels,
    fetchDeliveryParcels,
    username,
    setUsername,
    password,
    setPassword,
    filtered,
    setFiltered,
    setLoading
  };

  return (
    <UserContext.Provider value={values}>
      {loading ? <div className="loading-spinner centerlize">
        <SyncLoader color={"#00008B"} loading={loading} />
      </div> : children}
    </UserContext.Provider>
  );
}
