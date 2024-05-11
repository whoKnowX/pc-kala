import BlockTitle from "@/components/BlockTitle";
import BreadCrumb from "@/components/BreadCrumb";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Product from "@/components/Product";
import { unknownObjProps } from "@/global.t";
import { engCategoryToPersian, shuffleArray } from "@/utils";
import { GetStaticPropsContext } from "next";
import { useEffect, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import { HiOutlineClipboardList } from "react-icons/hi";
import { productSortOptions } from "@/data";



const Category = ({ product }: { product: [] }) => {

    const [products, setProducts] = useState(product)
    const [sortBy, setSortBy] = useState('')

    const breadCrumbData = [
        { text: "دسته بندی ها", link: `/category` },
        { text: `${engCategoryToPersian(product[0].category)}` }
    ]

    const productsToShow = [...productSortOptions].map(opt => (
        <li
            className={`cursor-pointer transition-all ${sortBy === opt.sort && "text-white-red"}`}
            key={opt.sort}
            onClick={() => opt.sort == sortBy ? setSortBy('') : setSortBy(opt.sort)}
        >
            {opt.text}
        </li>
    ))

    useEffect(() => {

        let sortedProducts = [...product]

        switch (sortBy) {
            case 'view': { sortedProducts = shuffleArray(sortedProducts); break }
            case 'cheap': { sortedProducts.sort((a: unknownObjProps<number>, b: unknownObjProps<number>) => a.price - b.price); break }
            case 'well-sell': { sortedProducts = shuffleArray(sortedProducts); break }
            case 'exp': { sortedProducts.sort((a: unknownObjProps<number>, b: unknownObjProps<number>) => b.price - a.price); break }
            default: { break }
        }

        setProducts(sortedProducts as [])
    }, [sortBy])

    return (

        <section className={"bg-primary primary-bg"}>

            <Header />

            <div className={"space-y-6 container"}>

                <BreadCrumb path={breadCrumbData} />

                <BlockTitle title={`قیمت لپ تاپ`} Icon={<HiOutlineClipboardList className="p-[6px]" />} />

                <div className="flex flex-col">

                    <div className="text-[11px] flex justify-between overflow-auto gap-6 items-center rounded-md p-3 bg-secondary-black">

                        <div className="flex items-center gap-5">

                            <div className="flex items-center flex-nowrap gap-2 text-white">
                                <BsSortDown className="size-6" />
                                <p>مرتب سازی : </p>
                            </div>

                            <ul className="flex items-center text-description-text gap-6 select-none">{productsToShow}</ul>

                        </div>

                        <div className="text-white hidden sm:block text-[13px]">{product.length} کالا</div>

                    </div>

                    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"}>
                        {
                            [...products].map(data => <Product {...data} key={data._id} />)
                        }
                    </div>

                </div>

            </div>

            <div className="h-12"></div>

            <Footer />

        </section>
    );
}

export default Category;

export async function getStaticProps(context: GetStaticPropsContext) {

    const { category } = context.params

    try {

        const response = await fetch(`http://localhost:3000/api/products/category/${category}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category)
        });

        if (!response.ok) throw new Error('Failed to fetch product')

        const product = await response.json();

        return { props: { product } };

    } catch (error) {
        console.error('Error fetching product:', error);
        return { notFound: true }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { category: 'laptop' } },
            { params: { category: 'parts' } },
            { params: { category: 'accessory' } },
            { params: { category: 'pc' } },
            { params: { category: 'console' } }
        ],
        fallback: false,
    };
}