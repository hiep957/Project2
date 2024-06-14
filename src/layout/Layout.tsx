import { Footer1 } from "../component/Footer";
import Header from "../component/Header";


interface Props {
    children: React.ReactNode;
  }
const Layout = ({children}:Props) => {
    return(
        <div className="flex flex-col">
            <Header></Header>
            <div className="container mx-auto py-5 space-x-3">{children}</div>
            <Footer1></Footer1>
        </div>
    )
}

export default Layout;