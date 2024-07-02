import Comment from '@/components/p-admin/Comment';
import Layout from '@/components/p-admin/Layout'
import { commentProps } from '@/global.t';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Pagination from '@/components/p-admin/Pagination'

const index = () => {

    const [comments, setComments] = useState<commentProps[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [allPages, setAllPages] = useState(0)
    const [updater, setUpdater] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useLayoutEffect(() => {

        (async () => {

            if (isLoading) return

            try {
                setIsLoading(true)

                const res = await fetch('/api/comment/getAll', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currentPage })
                })

                const { comments: newComments, availablePages } = await res.json()

                setAllPages(availablePages)
                setComments([...newComments])

            } catch (error) { console.log(error) }
            finally { setIsLoading(false) }
        })()

    }, [currentPage, updater])

    return (
        <div>
            <Layout>
                <div>

                    <h3 className='text-[26px] font-peyda pt-4 font-bold text-panel-darkBlue'>مدریت کامنت ها</h3>

                    <div className='grid grid-cols-1 pt-4'>

                        <table className='w-full text-center overflow-x-auto rounded-md'>

                            <thead>
                                <tr className='font-peyda md:text-[18px] sm:text-[16px] text-[14px] text-center w-full ch:bg-white ch:py-2 ch:text-panel-darkTitle'>
                                    <td>شماره</td>
                                    <td>اسم</td>
                                    <td>ایمیل</td>
                                    <td>امتیاز</td>
                                    <td>محصول</td>
                                    <td>تاریخ ثبت</td>
                                    <td className='w-20 whitespace-nowrap'>مشاهده</td>
                                    <td className='w-20 whitespace-nowrap'>تایید/رد</td>
                                </tr>
                            </thead>

                            <tbody className='overflow-auto border border-white'>

                                {/* { CommentsSuspense()} */}

                                {
                                    comments?.length
                                        ?
                                        comments.map((commentData, index) => <Comment
                                            commentsUpdater={() => setUpdater(prev => !prev)}
                                            rowNumber={index + ((currentPage - 1) * 12)}
                                            key={commentData._id}
                                            {...commentData}
                                        />)
                                        : null
                                }
                            </tbody>

                        </table>

                        {
                            comments?.length
                                ?
                                <Pagination
                                    currentPage={currentPage}
                                    latestPage={allPages}
                                    currentPageUpdater={page => setCurrentPage(page)}
                                />
                                : null
                        }

                    </div>

                </div>
            </Layout>

        </div>
    )
}

export default index
