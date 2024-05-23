import { IoClose } from "react-icons/io5"
import Link from "next/link"
import Image from "next/image"

export interface ProductCartProps {
    price: number
    finalPrice: string
    count: number
    title: string
    src?: string
    id: number
}

const ProductCart = ({ price, finalPrice, count, title, src, id }: ProductCartProps) => {

    return (
        <>
            <tr className=" block sm:hidden text-center border-b p-2 border-dark-gold pb-3 text-[13px]">

                <td className="flex flex-col">
                    <div className="sm:flex-1 cursor-pointer ml-auto flex-center "><IoClose className="size-6 rounded-sm bg-primary-black p-1" /></div>

                    <div className="m-auto flex items-center justify-between">
                        <Image width={400} height={400} className="object-cover size-1/2 p-1" alt={title} src={src} />

                        <div className="flex flex-col gap-1">
                            <div>تعداد: <span className="text-white-red"> {price}</span> * {count} تومان </div>
                            <div>مجموع: <span className="text-white-red">{finalPrice}</span> تومان</div>
                        </div>

                    </div>

                    <Link href={`/product/${id}`} className="sm:flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
                </td>

            </tr>

            <tr className="border-y w-full isHidden border-gold/30 text-[13px] ch:border-l ch:border-dark-gold ch:last:border-l-none">

                <td className="flex ch:border-l ch:border-dark-gold">
                    <div className="flex-1 cursor-pointer flex-center border-r border-dark-gold"><IoClose className="size-6 rounded-sm bg-primary-black p-1" /></div>
                    <div className="flex-[2] size-20"><Image width={400} height={400} alt={title} className="object-cover size-full p-1" src={src as string} /></div>
                    <Link href={`/products/search/${id}`} className="flex-[8] hover:text-blue-white transition-all duration-200 cursor-pointer h-full m-auto text-title-text px-2 last:border-none">{title}</Link>
                </td>

                <td><span className="text-white-red">{price}</span> تومان</td>

                <td>{count}</td>

                <td><span className="text-white-red">{finalPrice}</span> تومان</td>
            </tr>
        </>
    )
}

export default ProductCart