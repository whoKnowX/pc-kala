import { unknownObjProps } from "@/global.t"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsStarFill } from "react-icons/bs"
import { FaRegEye } from "react-icons/fa"

interface commentProps {
    _id: string
    createdAt: string
    productID: unknownObjProps<number>
    accepted: 1 | 0 | -1
    rate: number
}

const Comment = ({ _id, createdAt, productID, rate, accepted }: commentProps) => {

    const navigate = useRouter()
    const [isMessageShown, setIsMessageShown] = useState(false)

    return (
        <tr className="sm:text-[13px] text-[12px] ch:md:p-2 ch:py-4 border-b border-black/15 hover:bg-secondary-black transition-all">

            <td dir="ltr" className="text-[14px] tracking-wide">#{_id.slice(-4, -1).toUpperCase()}</td>

            <td>{new Date(createdAt).toLocaleDateString('fa-IR')}</td>

            <td>
                <div
                    dir="ltr"
                    className="line-clamp-1 md:max-w-[180px] max-w-[140px] hover:text-blue-500 duration-200 transition-all flex-center whitespace-nowrap underline m-auto w-full cursor-pointer overflow-ellipsis" >
                    <Link href={`/products/search/${productID._id}`} className="hidden sm:block">{productID.name}</Link>
                    <Link href={`/products/search/${productID._id}`} className="text-white-red text-[15px] sm:hidden">...</Link>
                </div>
            </td>

            <td className="break-words max-w-[110px]">
                <div className="flex-center ch:size-4 m-auto gap-1">
                    {
                        new Array(rate).fill(0).map((_, index) => <BsStarFill className="text-gold" key={index} />)
                            .concat(new Array(5 - rate).fill(0).map((_, index) => <BsStarFill key={index + 5} />))
                    }
                </div>
            </td>

            <td>
                <div className={`sm:w-3/4 w-[87%] sm:h-3/4 h-[87%] m-auto text-[9px] sm:text-[12px] flex-center whitespace-nowrap ${accepted == 1 ? 'bg-green' : accepted == 0 ? 'bg-white-red' : 'bg-dark-gold/70'} sm:p-2 p-1 rounded-md text-[12px]`}>
                    {
                        accepted == 1
                            ?
                            'تایید شده'
                            :
                            accepted == 0
                                ?
                                'رد شده'
                                :
                                'درحال بررسی'
                    }
                </div>
            </td>

            <td>
                <div className="flex-center items-center ch:border ch:border-white/35 sm:ch:size-9 sm:ch:p-2 ch:size-7 ch:p-1 ch:rounded-md ch:cursor-pointer ch:bg-secondary-black">
                    <FaRegEye onClick={() => {}} />
                </div>
            </td>
        </tr>
    )
}

export default Comment