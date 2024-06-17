import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";


const Api = ()=> {
    //ham lay cookies từ backend gửi sang
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const role_data = queryParams.get('role');
    const access_Token = queryParams.get('access_token');
    const authContext = useContext(AuthContext);
    const {role,setRole} = authContext ?? { setRole: () => {} };
    const navigate = useNavigate();
    console.log(role);
    console.log(access_Token);
    useEffect(() => {
        // Giả sử bạn nhận được role từ backend và đặt role ở đây
        setRole(role_data);

        // Kiểm tra role và chuyển hướng nếu cần
        if (role === "student") {
            navigate('/');
        }
        if (role === "instructor") {
            navigate('/giaovien');
        }
        if (role === "academic_affair") {
            navigate('/giaovu');
        }
    }, [role, setRole, navigate]);
    return (
        <div>
            <h1>Api</h1>
            <p>{role}</p>
        </div>
    )
}

export default Api