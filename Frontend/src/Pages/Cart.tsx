import { Link } from "react-router-dom";
import Footer from "../components/Footer"
import Header from "../components/Header"
import { CgFileDocument } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import ProductCart from "../components/ProductCart";
import Button from "../components/Button";
const Card = () => {
    return (
        <>
            <Header />

            <section className=" bg-primary-black text-[11px]">

                <span className='pt-[160px] block'></span>

                <div className="container">

                    <div className="flex items-center justify-evenly ch:cursor-pointer gap-24">

                        <Link to="/" className="flex items-center flex-col gap-2">
                            <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                            <p className="text-description-text transition-all hover:text-white">سبد خرید</p>
                        </Link>
                        <Link to="/" className="flex items-center flex-col gap-2">
                            <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                            <p className="text-description-text transition-all hover:text-white">جزئیات پرداخت</p>
                        </Link>
                        <Link to="/" className="flex items-center flex-col gap-2">
                            <CgFileDocument className="size-11 rounded-md text-dark-red/90 p-2 bg-secondary-black" />
                            <p className="text-description-text transition-all hover:text-white">تکمیل سفارش</p>
                        </Link>

                    </div>

                    <div className="flex items-center gap-5 text-white ch:rounded-md ch:p-3 mt-12 ch:bg-secondary-black">
                        <div className="flex-[3.2]">

                            <table className="w-full text-center">

                                <thead className="">
                                    <tr className="bg-primary-black ch:p-5">
                                        <td>محصول</td>
                                        <td>قیمت</td>
                                        <td>تعداد</td>
                                        <td>جمع جزء</td>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        [2, 43, 2].map(prd => {
                                            return <ProductCart
                                                key={prd}
                                                title="لپ تاپ ایسوس TUF Gaming F15 FX507VV4-AB i9-13900H/16GB/512GB/RTX4060-8G - گارانتی 18 ماهه شرکتی"
                                                count={12}
                                                price={12343523}
                                                finalPrice={34523455}
                                                id={12}
                                                src="/images/victus-15.webp"
                                            />
                                        })
                                    }

                                </tbody>
                            </table>

                            <div className="mt-20 border relative border-title-text rounded-md p-3">
                                <span className="absolute w-20 h-4 p-3 bg-primary-black top-0 right-[30px] rounded-sm flex-center -translate-y-[50%]">کد تخفیف:</span>
                                <div className="mt-5 flex items-center justify-between rounded-sm bg-primary-black border border-white/10">
                                    <input placeholder="کد تخفیف:" className="w-full text-[16px] placeholder:text-[12px] flex-[5] outline-none bg-transparent p-2" type="text" />
                                    <div className="p-2"><Button filled text="اعمال کد تخفیف" fn={() => { }} /></div>
                                </div>
                            </div>

                        </div>
                        <div className="flex-1 mb-auto border border-gold/30">w</div>
                    </div>

                </div>

                <div className="h-[500px]"></div>

                <Footer />
            </section>

        </>

    )
}

export default Card