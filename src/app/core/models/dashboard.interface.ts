export type charttype = "doughnut" | "bar" | "line" | "scatter" | "bubble" | "pie" | "polarArea" | "radar" ;

export  interface MenuItem {
  route: string;
  name: string;
  iconName: string;
  active?: boolean;
}

export  interface filtitem {
  name: string;
  iconName: string;
}

export  interface chartData {
  title: string;
  value: string;
}

export  interface tableListData {
  nSno?:number;
  cCusName:string;
  cCusDes:string;
}
