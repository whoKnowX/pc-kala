import { FaAngleLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

interface BreadcrumbItem {
    text: string;
    link: string;
}

interface BreadCrumbProps {
    path: BreadcrumbItem[];
}


const BreadCrumb = ({ path }: BreadCrumbProps) => {

    const paths = path
    const pathElements = [...paths].map((path, len) => <Link to={path.link} key={len} className="flex items-center gap-2">{path.text}  {paths.length - 1 !== len && <FaAngleLeft />}</Link>)

    return (
        <div className="bg-secondary-black text-nowrap rounded-md gap-2 overflow-auto container p-3 flex items-center mb-4 md:mt-[150px] mt-[120px] text-[12px] ch:ch:size-4 text-description-text">
            <Link to="/" className="flex items-center gap-2">خانه‌<FaAngleLeft /></Link>
            {pathElements}
        </div>
    )
}

export default BreadCrumb