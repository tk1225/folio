import React,{useState, useEffect} from 'react';
import {
    Table,
    Tbody,
    Tr,
    Td,
    Box
  } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

import {Information} from "./information"
import {Timeline} from "./timeline"
import LineChart from '../../charts/LineChart01';
  // Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

export const Table_static=React.memo((props)=>{
    const {key_ratio_data}= props;
    const [activeRatio,setActiveRatio]=useState("priceEarningsRatio")
    const [prepRatiodata,setprepRatiodata]=useState(1)
    const [chartData, setchartData] = useState(
        {
            labels: ["2011-11-11","2011-12-11","2012-01-11"],
            datasets: [
              // Indigo line
              {
                data: [10,5,10],
                fill: true,
                backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.indigo[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
                clip: 20,
              }
            ],
          }
    );

    

    const contents_stats={
        "symbol": "AAPL",
        "date": "2020-09-26",
        "period": "FY",
        "currentRatio": {
            "name":"流動比率",
            "title":"流動比率＝流動資産÷流動負債×100",
            "contents":"流動資産は１年以内に現金化される資産で流動負債は１年以内に支払わなくてはいけない負債になります。短期的な安全性を表していて高いほど健全です。一般的に200%を超えていると望ましいとされています。100%を割るときには注意が必要です。"},
        
        "quickRatio": {"name":"当座比率",
            "title":"当座比率＝当座資産/流動負債×100","contents":"当座資産とは、現金預金、売掛金などすぐにお金に変えられる資産のことです。流動負債は１年以内に支払う必要のある負債なのでこれが当座資産より多いと短期的な安全性に懸念があります。流動比率と比べると現金化できる費目に在庫や原材料を含まないのでよりシビアに安全性を評価できる指標になります。"},
        
        "cashRatio": {"name":"現金比率",
            "title":"現金比率","contents":"test"},
        "daysOfSalesOutstanding": {"name":"売上債権回転日数",
            "title":"売上債権回転日数＝売上高÷売上債権×365日","contents":"売上債権回転日数が短いほど、売上債権が短期間で回収できることになります。"},

        "daysOfInventoryOutstanding": {
            "name":"棚卸資産回転日数",
            "title":"棚卸資産回転日数=棚卸資産÷売上高×365日","contents":"棚卸資産回転日数が短いほど短期で棚卸資産（在庫）を生産販売するサイクルを回せている事になります。"},
        "operatingCycle": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
       
        "daysOfPayablesOutstanding": {
            "name":"仕入債務回転日数","title":"仕入債務回転日数=仕入債務/仕入債務支払高×365日","contents":"日数が長いほど債務の支払い猶予が長いことを意味し、手元にお金がない状態が短く済むため、資金繰りは改善します。"},

        "cashConversionCycle": {
            "name":"CCC","title":"CCC=売上債権回転日数+棚卸資産回転日数-仕入債務回転日数","contents":"キャッシュ→商品→支払い→販売→回収の流れで、企業にはキャッシュが流れてきます。この期間が短い程、投資してからキャッシュとして投資を回収できる短い事を意味します。CCCはこのサイクルの日数を表していて短いほど、優秀なCCCであると言えます。"},
        
        "grossProfitMargin": {
            "name":"売上総利益率(GP率)","title":"売上総利益率(GP率)=(売上高-売上原価)÷売上×100","contents":"売上総利益(GrossProfit)は売上から売上原価(売れた商品の仕入れや製造にかかった費用)を引いた数値で商品の稼ぐ力を表します。"},

        "operatingProfitMargin": {
            "name":"営業利益率(OP率)","title":"営業利益率(OP率)=(売上高-売上原価-販管費)÷売上高×100","contents":"売上高から売上原価(売れた商品の費用)と販管費(販売手数料、間接部門の人件費など)を引いた数値の売上に占める割合になります。"},
        
        "pretaxProfitMargin": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "netProfitMargin": {
            "name":"純利益率","title":"純利益率=当期純利益÷売上×100","contents":"当期純利益は営業利益から営業外損益や税金を控除した後の数値です。"},
        "effectiveTaxRate": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "returnOnAssets": {
            "name":"ROA","title":"ROA=当期純利益の額÷総資産額×100","contents":"会社の事業に対して投資された資産について、どれだけ効率よく収益を得ているかを示す指標です。"},
        "returnOnEquity": {
            "name":"ROE","title":"ROE=当期純利益÷自己資本×100","contents":"ROE（自己資本利益率）は、企業が自己資本をいかに効率的に運用して利益を生み出したかを表す指標です。ROEが高い会社は株主が投資したお金を使って効率よく稼いでいる会社と言えます。一般的には、ROEが10～20％程度であれば優良企業であると判断されます。"},
        
        "returnOnCapitalEmployed":{
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "netIncomePerEBT": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "ebtPerEbit": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "ebitPerRevenue": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "debtRatio": {
            "name":"負債比率","title":"負債比率＝負債÷自己資本×100","contents":"負債の返済余力が分かります。負債比率が低いほど返済余力が高く、財務の安定性が高いです。負債比率が100％を下回っていると、中長期的な安全性（支払能力）が高いと言われています。"},
        "debtEquityRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "longTermDebtToCapitalization": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "totalDebtToCapitalization": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "interestCoverage": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "cashFlowToDebtRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "companyEquityMultiplier":{
            "name":"自己資本比率","title":"自己資本比率=自己資本÷資産(他人資本+自己資本)×100","contents":"自己資本比率が高いほど、借りているお金が少なく、会社の純資産が多いことを示します。自己資本比率が高いほど安全性が高まり業種ごとに異なりますが40%程度が目安です。"},
        "receivablesTurnover": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "payablesTurnover": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "inventoryTurnover": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "fixedAssetTurnover": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "assetTurnover": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "operatingCashFlowPerShare": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "freeCashFlowPerShare": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "cashPerShare": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "payoutRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "operatingCashFlowSalesRatio":{
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "freeCashFlowOperatingCashFlowRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "cashFlowCoverageRatios": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "shortTermCoverageRatios": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "capitalExpenditureCoverageRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "dividendPaidAndCapexCoverageRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "dividendPayoutRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "priceBookValueRatio": {
            "name":"PBR","title":"PBR＝株価÷1株当たり純資産","contents":"資産面から株価が割高か割安かをみる指標で、この数値が高いほど、企業価値が市場から純資産に比べて高く評価されているといえます。"},
        "priceToBookRatio":{
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "priceToSalesRatio": {
            "name":"PSR","title":"PSR=時価総額÷売上高","contents":"PSRは新興成長企業の株価水準をはかる指標として用いられ高いほど割高となります。"},
        "priceEarningsRatio":{
            "name":"PER","title":"PER=株価÷一株当たり当期純利益(EPS)","contents":"現在の株価が企業の利益水準に対して割高か割安かを判断する目安として利用されます。PERの数値は、低いほうが株価は割安と判断されます。"},
        "priceToFreeCashFlowsRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "priceToOperatingCashFlowsRatio":{
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "priceCashFlowRatio": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"},
        "priceEarningsToGrowthRatio":{
            "name":"PEG","title":"PEG＝PER÷成長率","contents":"一般に1倍から2倍程度の数値が標準的であり、1倍を下回ると割安、2倍を上回ると割高といった具合に判断基準が用いられます。特に新興企業の動向を分析する目的において有用な指標です。"},
        "priceSalesRatio": {
            "name":"PSR","title":"PSR=時価総額÷売上高","contents":"PSRは新興成長企業の株価水準をはかる指標として用いられ高いほど割高となります。"},
        "dividendYield": {
            "name":"配当利回り","title":"配当利回り(％)=1株当たりの年間配当金額÷1株購入価額×100","contents":"購入した株価に対し、1年間でどれだけの配当を受けることができるかを示す数値です。"},
        "enterpriseValueMultiple": {
            "name":"EV/EBITDA倍率","title":"EV/EBITDA倍率=(株式時価総額+純有利子負債-非事業用資産+少数株主持分)/(営業利益+減価償却費)","contents":"「EV/EBITDA倍率（EBITDAマルチプル）」とは、ある企業の事業全体の価値（EV）を、その企業がキャッシュを生み出す力（EBITDA）で割った倍率のことを言います。M&Aの際に使用され目安は8~10倍とされています。"},
        "priceFairValue": {
            "name":"売上債権回転日数","title":"流動比率","contents":"test"}
      }


    useEffect(() =>{
        let label_list=[]
        let data_list=[]
          key_ratio_data.map((e)=>{
              label_list.push(e.date)
              if (activeRatio=="companyEquityMultiplier"){
              data_list.push(1/e[activeRatio]*prepRatiodata) 
              }else{
              data_list.push(e[activeRatio]*prepRatiodata) 
              }
          })
  
          setchartData({
            labels: label_list,
            datasets: [
              // Indigo line
              {
                data: data_list,
                fill: true,
                backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
                borderColor: tailwindConfig().theme.colors.indigo[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
                clip: 20,
              }
            ],
          })

    },[key_ratio_data,activeRatio])
    
      



    return (
        <>
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
    <div className="px-5 pt-5">
    <header className="text-xs uppercase text-black-400 bg-gray-50 rounded-sm font-semibold p-2">重要指標</header>
    <Tabs>
        <TabList >
            <Tab fontSize={12}>サマリー</Tab>
            <Tab fontSize={12}>安全性</Tab>
            <Tab fontSize={12}>収益性</Tab>
            <Tab fontSize={12}>割安性</Tab>
            <Tab fontSize={12}>効率性</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <Table size="sm">
                    <Tbody>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("returnOnEquity") 
                                                setprepRatiodata(100)}}>ROE</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].returnOnEquity*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.returnOnEquity.title} contents={contents_stats.returnOnEquity.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("returnOnEquity") 
                                                setprepRatiodata(100)}}><Timeline  /></Td>
                          
                        </Tr>
                        
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("priceEarningsRatio") 
                                                setprepRatiodata(1)}}>PER</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].priceEarningsRatio*10)/10}倍</Td>
                            <Td ><Information title={contents_stats.priceEarningsRatio.title} contents={contents_stats.priceEarningsRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("priceEarningsRatio") 
                                                setprepRatiodata(1)}}><Timeline  /></Td>
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("priceBookValueRatio")
                                                setprepRatiodata(1) }}>PBR</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].priceBookValueRatio*10)/10}倍</Td>
                            <Td ><Information title={contents_stats.priceBookValueRatio.title} contents={contents_stats.priceBookValueRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("priceBookValueRatio")
                                                setprepRatiodata(1) }}><Timeline  /></Td>
                      
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("dividendYield")
                                                setprepRatiodata(100) }}>配当利回り</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].dividendYield*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.dividendYield.title} contents={contents_stats.dividendYield.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("dividendYield")
                                                setprepRatiodata(100) }}><Timeline  /></Td>

                        </Tr>
                    </Tbody>
                </Table>
            </TabPanel>

            <TabPanel>
                <Table size="sm">
                    <Tbody>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("debtRatio") 
                                                setprepRatiodata(100)}}>負債比率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].debtRatio*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.debtRatio.title} contents={contents_stats.debtRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("debtRatio") 
                                                setprepRatiodata(100)}}><Timeline  /></Td>
                            
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("currentRatio")
                                                setprepRatiodata(100) }}>流動比率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].currentRatio*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.currentRatio.title} contents={contents_stats.currentRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("currentRatio")
                                                setprepRatiodata(100) }}><Timeline  /></Td>
                        
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("companyEquityMultiplier") 
                                                setprepRatiodata(100)}}>自己資本比率</Td>
                            <Td isNumeric>{Math.round((1/key_ratio_data[0].companyEquityMultiplier)*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.companyEquityMultiplier.title} contents={contents_stats.companyEquityMultiplier.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("companyEquityMultiplier") 
                                                setprepRatiodata(100)}}><Timeline  /></Td>
      
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("quickRatio")
                                                 setprepRatiodata(100)    }}>当座比率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].quickRatio*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.quickRatio.title} contents={contents_stats.quickRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("quickRatio")
                                                 setprepRatiodata(100)    }}><Timeline  /></Td>
                   
                        </Tr>
                    </Tbody>
                </Table>
            </TabPanel>

            <TabPanel>
                <Table size="sm">
                    <Tbody>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("grossProfitMargin") 
                                                setprepRatiodata(100) }}>売上高総利益率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].grossProfitMargin*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.grossProfitMargin.title} contents={contents_stats.grossProfitMargin.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("grossProfitMargin") 
                                                setprepRatiodata(100) }}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("returnOnEquity") 
                                                setprepRatiodata(100)}}>ROE</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].returnOnEquity*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.returnOnEquity.title} contents={contents_stats.returnOnEquity.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("returnOnEquity") 
                                                setprepRatiodata(100)}}><Timeline  /></Td>
                            
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("returnOnAssets")
                                            setprepRatiodata(100) }}>ROA</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].returnOnAssets*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.returnOnAssets.title} contents={contents_stats.returnOnAssets.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("returnOnAssets")
                                            setprepRatiodata(100) }}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("netProfitMargin") 
                                                setprepRatiodata(100)}}>純利益率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].netProfitMargin*1000)/10}%</Td>
                            <Td ><Information title={contents_stats.netProfitMargin.title} contents={contents_stats.netProfitMargin.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("netProfitMargin") 
                                                setprepRatiodata(100)}}><Timeline  /></Td>

                        </Tr>
                    </Tbody>
                </Table>
            </TabPanel>
            
            <TabPanel>
                <Table size="sm">
                    <Tbody>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("priceToSalesRatio") 
                                                setprepRatiodata(1)}}>PSR</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].priceToSalesRatio*10)/10}倍</Td>
                            <Td ><Information title={contents_stats.priceToSalesRatio.title} contents={contents_stats.priceToSalesRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("priceToSalesRatio") 
                                                setprepRatiodata(1)}}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("priceEarningsRatio") 
                                                setprepRatiodata(1)}}>PER</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].priceEarningsRatio*10)/10}倍</Td>
                            <Td ><Information title={contents_stats.priceEarningsRatio.title} contents={contents_stats.priceEarningsRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("priceEarningsRatio") 
                                                setprepRatiodata(1)}}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("priceEarningsToGrowthRatio") 
                                                setprepRatiodata(1)}}>PEG</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].priceEarningsToGrowthRatio*10)/10}倍</Td>
                            <Td ><Information title={contents_stats.priceEarningsToGrowthRatio.title} contents={contents_stats.priceEarningsToGrowthRatio.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("priceEarningsToGrowthRatio") 
                                                setprepRatiodata(1)}}><Timeline  /></Td>
                            
                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("enterpriseValueMultiple")
                                                setprepRatiodata(1) }}>EV/EVTDA</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].enterpriseValueMultiple*10)/10}倍</Td>
                            <Td ><Information title={contents_stats.enterpriseValueMultiple.title} contents={contents_stats.enterpriseValueMultiple.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("enterpriseValueMultiple")
                                                setprepRatiodata(1) }}><Timeline  /></Td>

                        </Tr>
                    </Tbody>
                </Table>
            </TabPanel>
            
            <TabPanel>
                <Table size="sm">
                    <Tbody>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("cashConversionCycle") 
                                                setprepRatiodata(1)}}>CCC</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].cashConversionCycle)}日</Td>
                            <Td ><Information title={contents_stats.cashConversionCycle.title} contents={contents_stats.cashConversionCycle.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("cashConversionCycle") 
                                                setprepRatiodata(1)}}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("daysOfInventoryOutstanding")
                                                setprepRatiodata(1) }}>棚卸資産回転率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].daysOfInventoryOutstanding)}日</Td>
                            <Td ><Information title={contents_stats.daysOfInventoryOutstanding.title} contents={contents_stats.daysOfInventoryOutstanding.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("daysOfInventoryOutstanding")
                                                setprepRatiodata(1) }}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("daysOfPayablesOutstanding")
                                                setprepRatiodata(1) }}>仕入れ債務回転率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].daysOfPayablesOutstanding)}日</Td>
                            <Td ><Information title={contents_stats.daysOfPayablesOutstanding.title} contents={contents_stats.daysOfPayablesOutstanding.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("daysOfPayablesOutstanding")
                                                setprepRatiodata(1) }}><Timeline  /></Td>

                        </Tr>
                        <Tr>
                            <Td onClick={() =>{setActiveRatio("daysOfSalesOutstanding") 
                                                setprepRatiodata(1)}}>売上債権回転率</Td>
                            <Td isNumeric>{Math.round(key_ratio_data[0].daysOfSalesOutstanding)}日</Td>
                            <Td ><Information title={contents_stats.daysOfSalesOutstanding.title} contents={contents_stats.daysOfSalesOutstanding.contents}/></Td>
                            <Td onClick={() =>{setActiveRatio("daysOfSalesOutstanding") 
                                                setprepRatiodata(1)}}><Timeline  /></Td>
                            
                        </Tr>
                    </Tbody>
                </Table>
            </TabPanel>
        </TabPanels>
    </Tabs>
    <header className="text-xs uppercase text-black-400 bg-gray-50 rounded-sm font-semibold p-2">{contents_stats[activeRatio].name}推移</header>
    
        {/* Chart built with Chart.js 3 */}
        <div className="flex-grow">
             <LineChart data={chartData} width={189} height={128} />
        </div>
    </div>    
    </div>
        </>
        )
})