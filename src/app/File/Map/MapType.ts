

export type Place ={
  startTime?: number;
  place?: string;
  googlePlace?: string;
  describe: string | null;
  location?: {
    lat:number,
    lng:number
  },
  id:string,
  index?:number,
  color?:string,
  emozi?:string,
  category?:string,
  image?: string[] | null;
}



