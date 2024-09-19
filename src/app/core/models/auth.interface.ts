export interface icon {
  name: string;
  type?: string;
}

export interface validCond {
  cond1: boolean;
  cond2?: boolean;
  form_submit: boolean;
}

export interface signin {
  cEmail: string;
  cPass: string;
}

export interface signup {
  cName: string;
  cEmail: string;
  cPass: string;
  bCheck: boolean;
}
