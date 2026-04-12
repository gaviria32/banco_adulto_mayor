export type Screen = 
  | 'LOGIN' 
  | 'HOME' 
  | 'MOVEMENTS' 
  | 'SEND_STEP_1' 
  | 'SEND_STEP_2' 
  | 'SEND_STEP_3' 
  | 'PAY_STEP_1' 
  | 'PAY_STEP_2' 
  | 'HELP' 
  | 'SETTINGS'
  | 'RECHARGE_STEP_1'
  | 'RECHARGE_STEP_2'
  | 'WITHDRAW_STEP_1'
  | 'WITHDRAW_STEP_2'
  | 'SERVICES'
  | 'LOANS_SCREEN'
  | 'INSURANCE_SCREEN'
  | 'CERTS_SCREEN'
  | 'INVEST_SCREEN';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  time: string;
  category: string;
  date: 'Hoy' | 'Ayer' | 'Hace 2 días' | 'Hace 3 días';
  type: 'INCOME' | 'EXPENSE';
}

export interface Contact {
  id: string;
  name: string;
  image: string;
  account: string;
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Pago de Energía',
    amount: -85000,
    time: '10:45 AM',
    category: 'Servicios Públicos',
    date: 'Hoy',
    type: 'EXPENSE',
  },
  {
    id: '2',
    title: 'Pensión recibida',
    amount: 1335000,
    time: '08:15 AM',
    category: 'Depósito',
    date: 'Hoy',
    type: 'INCOME',
  },
  {
    id: '3',
    title: 'Supermercado El Roble',
    amount: -142500,
    time: '05:20 PM',
    category: 'Compras',
    date: 'Ayer',
    type: 'EXPENSE',
  },
  {
    id: '4',
    title: 'Transferencia de Juan',
    amount: 50000,
    time: '11:30 AM',
    category: 'Entre particulares',
    date: 'Ayer',
    type: 'INCOME',
  },
  {
    id: '5',
    title: 'Farmacia Central',
    amount: -28400,
    time: '09:10 AM',
    category: 'Salud',
    date: 'Ayer',
    type: 'EXPENSE',
  },
];

export const MOCK_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Hijo Juan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLiJq31SKw29cjIaBA1xT2r6XfIeZ6XQGNoarYPuP0xT8ZQag-wBgbUXzq0xnmArIRhJHHBRvrMvb5uy4w4k4aNzYvIOKDvRNbxnTW2P8LsTWsZKVsnASi8ykVGwoHgLA-0FdxSpkoc2sd9kp8wL6K7VJ6ruivrz2KYCRHbHX6chxAHcg0YowchMaKobWpL1y8QLah7V78tU2iTodJR96QuFCyICE40xkDX0AX6riPyaQbEMsEwMD1xczxvqNSETOwnu1KkXoXxzU',
    account: '**** 8923',
  },
  {
    id: '2',
    name: 'Nieta Sofía',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvu3Bt4lNvjsDx0JlzIaKqfABWzRe81oPI2s7BmTtYksO4S7pUkodoyQwmIePrEZLd3UJe6ld-iG7-bhTGn_-nJ439ZJMFGrW0rAX_myqCQEqOq7_bgkV4IZwT6i1KFue-IjwnturOHAoDv4aEQ8jYnbQmn8ChQFqilO4ADdaPcMXxs5UXHcIgbe5xsmAm4ccH_v0Kgveqiehp9L-RZEJvz_d6OwLma7eQ3wLWHupky1wi1W3wCaOSJsed_c13_XicqoIqJxcNfRk',
    account: '**** 4567',
  },
];
