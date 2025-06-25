import Link from "next/link";
import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import { Suspense } from "react";

async function FilterHead({year, month}){
  const availableYears = await getAvailableNewsYears()
  let links = availableYears

  if((year && !availableYears.includes(year)) || 
   (month && !getAvailableNewsMonths(year).includes(month))){
      throw new Error("Invalid filter")
  }

  if(year && !month){
    links = getAvailableNewsMonths(selectedYear)
  }   
  if(year && month){
    links = []
  } 

  return <header id="archive-header">
    <nav>
      <ul>
        {links.map((link)=>{
          const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`
          return <li key={link}>
          <Link href={href}>{link}</Link>
          </li>
        })}
      </ul>
    </nav>
  </header>
}

async function FilteredNews({year, month}){
  let news;
  if(year && !month){
    news = await getNewsForYear(year)
  } else if(year && month){
    news = await getNewsForYearAndMonth(year, month)
    
  }
  
  let newsContent = <p>No News found for the selected period</p>

  if(news && news.length > 0){
    newsContent = <NewsList news={news} />
  }

  return newsContent
}

export default async function FilteredNewsPage({params}) {
  const filter = params.filter

  const selectedYear = filter?.[0]
  const selectedMonth = filter?.[1] 

  // let news;
  // const availableYears = await getAvailableNewsYears()
  // let links = await getAvailableNewsYears()
  // let links = availableYears

  // if(selectedYear && !selectedMonth){
    // news = await getNewsForYear(selectedYear)
    // links = getAvailableNewsMonths(selectedYear)
  // } 

  // if(selectedYear && selectedMonth){
    // news = await getNewsForYearAndMonth(selectedYear, selectedMonth)
    // links = []
  // }

  // let newsContent = <p>No News found for the selected period</p>

  // if(news && news.length > 0){
  //   newsContent = <NewsList news={news} />
  // }

  // const availableYears = await getAvailableNewsYears()

  if((selectedYear && !availableYears.includes(selectedYear)) || 
      (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))){
    throw new Error("Invalid filter")
  }

  // const news = getNewsForYear(newsYear)

  return <>
    {/* <header id="archive-header">
      <nav>
        <ul>
          {links.map((link)=>{
            const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`
            return <li key={link}>
             <Link href={href}>{link}</Link>
            </li>
          })}
        </ul>
      </nav>
    </header> */}
    <Suspense fallback={<p>loading filter...</p>}>
      <FilterHead year={selectedYear} month={selectedMonth} />
    </Suspense>
    <Suspense fallback={<p>Fetching data...</p>}>
      <FilteredNews year={selectedYear} month={selectedMonth} />
    </Suspense>
    {/* {newsContent} */}
    {/* <NewsList news={news} /> */}
  </>
}
