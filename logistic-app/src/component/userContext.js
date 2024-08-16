import { useEffect, useState, createContext } from "react";
import axiosConfig from "../config/axios";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [allParcels, setAllParcels] = useState([]);
  const [oriData, setOriData] = useState([])
  const [role, setRole] = useState(null);
  const [user, setUser] = useState({});
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

  const mapRoute = [
    {
      "Kuala Lumpur":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127482.68825017031!2d101.60458852720367!3d3.1385026607594853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362abd08e7d3%3A0x232e1ff540d86c99!2sKuala%20Lumpur%2C%20Federal%20Territory%20of%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1688517755784!5m2!1sen!2smy",
    },
    {
      Sabah:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2032549.9255804578!2d115.98518004475415!3d5.738456957538493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32155171c8bc8a9d%3A0x889d1e436c96b307!2sSabah!5e0!3m2!1sen!2smy!4v1688517989262!5m2!1sen!2smy",
    },
    {
      Kelantan:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2022138.8536717596!2d102.04835597363906!3d5.617244497492206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cad95ec86a0e85%3A0xb16c56a5e77e6eb7!2sKelantan!5e0!3m2!1sen!2smy!4v1688727766676!5m2!1sen!2smy",
    },
    {
      Pahang:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1019356.5694914551!2d102.11845999311126!3d3.6190978863832584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31c504e2889d108b%3A0x8b39eb767e5ba846!2sPahang!5e0!3m2!1sen!2smy!4v1688517303099!5m2!1sen!2smy",
    },
    {
      Terengganu:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2030381.4481796066!2d103.13148466130162!3d5.253477948003015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31b8688ff9997f45%3A0x95c6c4ebdf1a1c9c!2sTerengganu!5e0!3m2!1sen!2smy!4v1688727919432!5m2!1sen!2smy",
    },
    {
      Malacca:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035453.7634185728!2d102.07305320901475!3d2.249321274574714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cd3e435ae61e83%3A0xf61d25288d4a8945!2sMalacca!5e0!3m2!1sen!2smy!4v1688728100376!5m2!1sen!2smy",
    },
    {
      Sarawak:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8160645.201411182!2d107.31291705727199!3d2.905316756320766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31f62a0f014b6e47%3A0xf25aa56ec5fe1300!2sSarawak!5e0!3m2!1sen!2smy!4v1688531545183!5m2!1sen!2smy",
    },
    {
      "Negeri Sembilan":
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033153.0330077272!2d102.0523842441411!3d2.7254741130038354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cd3dcf4bbabf15%3A0x1c72bb4e3d9d52fe!2sNegeri%20Sembilan!5e0!3m2!1sen!2smy!4v1688728291729!5m2!1sen!2smy",
    },
    {
      Perak:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2032749.0555521253!2d101.01552672739233!3d4.573087157927818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cd00e8b8fcdd1b%3A0x3f9a9a06b2437535!2sPerak!5e0!3m2!1sen!2smy!4v1688728373097!5m2!1sen!2smy",
    },
    {
      Penang:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035849.0348761076!2d100.22631358897491!3d5.397942032646377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304b942d1a15d593%3A0x6bdf30b0301e123d!2sPenang!5e0!3m2!1sen!2smy!4v1688728506610!5m2!1sen!2smy",
    },
    {
      Selangor:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035661.267581759!2d101.372115874927!3d3.316579754302637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcae12e3b5d2d%3A0x9fa7d64f4c108789!2sSelangor!5e0!3m2!1sen!2smy!4v1688728674877!5m2!1sen!2smy",
    },
    {
      Johor:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2032999.3555837472!2d103.48477040031399!3d1.8539658243166828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da196d29e3c055%3A0x56ff6a17f5d26baf!2sJohor!5e0!3m2!1sen!2smy!4v1688728825681!5m2!1sen!2smy",
    },
    {
      Kedah:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2035273.835379958!2d100.34281420187445!3d6.124656468937975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304dbed8e4e3e5d7%3A0x5f9357d428b61c6c!2sKedah!5e0!3m2!1sen!2smy!4v1688728991904!5m2!1sen!2smy",
    },
    {
      Perlis:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d321328.68372480254!2d100.12711531910844!3d6.460339226659708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ed60c3503e52d%3A0x1c72bb4e3d9c16bc!2sPerlis!5e0!3m2!1sen!2smy!4v1688729129951!5m2!1sen!2smy",
    },
  ];

  const fetchParcel = async () => {
    try {
      const allData = await axiosConfig.get("/admin/data");
      if (allData.status === 200) {
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

  const fetchParcels = async () => {
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

  useEffect(() => {
    const roleToken = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (roleToken) {
      setIsLoggedin(true);
      setRole(roleToken);
    } else {
      setIsLoggedin(false);
      setRole(null);
    }
    if (token && roleToken === "deliveryguy") {
      fetchParcels();
    } else {
      fetchParcel();
    }
    setLoading(false);
  }, [navi]);

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
    fetchParcels,
    username,
    setUsername,
    password,
    setPassword,
    filtered,
    setFiltered
  };

  return (
    <UserContext.Provider value={values}>
      {loading ? <div className="loading-spinner centerlize">
        <SyncLoader color={"#00008B"} loading={loading} />
      </div> : children}
    </UserContext.Provider>
  );
}
