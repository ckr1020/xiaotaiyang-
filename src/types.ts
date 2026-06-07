export interface Cat {
  id: string;
  name: string;
  englishName: string;
  role: 'sire' | 'dam' | 'offspring';
  roleLabel: string; // "Sire" or "Dam" or "Offspring"
  image: string;
  birthday?: string;
  constellation?: string;
  traits: string[];
  gender: 'male' | 'female';
  color: string;
}

export interface Kitten {
  id: string;
  name: string;
  gender: 'male' | 'female';
  genderLabel: string; // "男孩" or "女孩"
  birthday: string;
  constellation: string;
  color: string; // "原始色 (Ruddy)", "蓝色 (Blue)", "红雕色 (Sorrel)"
  price: number;
  traits: string[];
  image: string;
  status: 'available' | 'reserved' | 'sold';
  statusLabel: string; // "待预订", "已预订", "已售"
}

export interface Reservation {
  id: string;
  kittenId: string;
  kittenName: string;
  clientName: string;
  phone: string;
  wechat: string;
  remarks: string;
  createdAt: string;
}

export interface Consultation {
  id: string;
  type: string; // "kitten" | "standard"
  subject: string;
  content: string;
  wechat: string;
  phone: string;
  createdAt: string;
}
