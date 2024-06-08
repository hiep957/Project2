import Header from "../component/Header";


interface Props {
    children: React.ReactNode;
  }
const Layout = ({children}:Props) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <div className="container mx-auto py-5 flex-1">{children}</div>
        </div>
    )
}

export default Layout;