export interface Company {
    id: number;
    name: string;
    ticker: string;
    sector: string;
    industry: string;
    ceo: string;
    location: string;
    employees: number;
    revenue: number;
    profits: number;
    marketCap: number;
    website: string;
    profitable: boolean;
    companyType: 'public' | 'private';
}

export const sampleCompanies: Company[] = [
    {
        id: 1,
        name: "Walmart",
        ticker: "WMT",
        sector: "Consumer Defensive",
        industry: "Discount Stores",
        ceo: "Doug McMillon",
        location: "Bentonville, Arkansas",
        employees: 2300000,
        revenue: 611289,
        profits: 13673,
        marketCap: 416044,
        website: "https://www.walmart.com",
        profitable: true,
        companyType: "public"
    },
    {
        id: 2,
        name: "Amazon",
        ticker: "AMZN",
        sector: "Consumer Cyclical",
        industry: "Internet Retail",
        ceo: "Andy Jassy",
        location: "Seattle, Washington",
        employees: 1608000,
        revenue: 513983,
        profits: 11323,
        marketCap: 1080000,
        website: "https://www.amazon.com",
        profitable: true,
        companyType: "public"
    },
    {
        id: 3,
        name: "Apple",
        ticker: "AAPL",
        sector: "Technology",
        industry: "Consumer Electronics",
        ceo: "Tim Cook",
        location: "Cupertino, California",
        employees: 164000,
        revenue: 394328,
        profits: 99803,
        marketCap: 2640000,
        website: "https://www.apple.com",
        profitable: true,
        companyType: "public"
    },
    {
        id: 4,
        name: "CVS Health",
        ticker: "CVS",
        sector: "Healthcare",
        industry: "Healthcare Plans",
        ceo: "Karen S. Lynch",
        location: "Woonsocket, Rhode Island",
        employees: 300000,
        revenue: 322467,
        profits: 4149,
        marketCap: 86510,
        website: "https://www.cvshealth.com",
        profitable: true,
        companyType: "public"
    },
    {
        id: 5,
        name: "UnitedHealth Group",
        ticker: "UNH",
        sector: "Healthcare",
        industry: "Healthcare Plans",
        ceo: "Andrew Witty",
        location: "Minnetonka, Minnesota",
        employees: 400000,
        revenue: 324162,
        profits: 20120,
        marketCap: 446727,
        website: "https://www.unitedhealthgroup.com",
        profitable: true,
        companyType: "public"
    }
];
