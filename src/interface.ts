interface Others {
  [key: string]: string;
}

interface TemplateOptions {
  subject: string;
  body: string;
  btn: string;
  others: Others;
}

interface MultiLangOptions {
  [key: string]: TemplateOptions;
}

export interface MainOptions {
  // Required
  port: number;
  host: string;
  user: string;
  password: string;
  fromAddress: string;
  secure?: boolean;
  // Simple Template
  template?: boolean;
  templatePath?: string;
  // Multi Template
  multiTemplate?: boolean;
  confirmTemplatePath?: string;
  passwordTemplatePath?: string;
  // Multi language
  multiLang?: boolean;
  multiLangColumn?: string;
  // Template Variables
  passwordOptions?: TemplateOptions;
  confirmOptions?: TemplateOptions;
  // Multi language template variables
  multiLangPass?: MultiLangOptions;
  multiLangConfirm?:MultiLangOptions;
}