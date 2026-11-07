export interface VictimRecord {
  id: string;
  name: string;
  roomNumber: string;
  amount: number;
  foodItem: string;
  timeAgo: string;
  roastComment: string;
}

export const INITIAL_VICTIMS: VictimRecord[] = [
  {
    id: 'v1',
    name: 'Anonymous Resident',
    roomNumber: '',
    amount: 1450,
    foodItem: 'Butter Chicken & 6 Garlic Naan',
    timeAgo: '4 mins ago',
    roastComment: 'Thought Sunny Bhaiya was Ambani today',
  },
  {
    id: 'v2',
    name: 'Anonymous Resident',
    roomNumber: '',
    amount: 680,
    foodItem: 'Chicken Dum Biryani (Large)',
    timeAgo: '11 mins ago',
    roastComment: 'Already checked bank balance 8 times',
  },
  {
    id: 'v3',
    name: 'Anonymous Resident',
    roomNumber: '',
    amount: 920,
    foodItem: 'Domino’s 4 Cheese Pizza + Choco Lava',
    timeAgo: '19 mins ago',
    roastComment: 'Sunny Bhaiya is going to cut the AC power',
  },
  {
    id: 'v4',
    name: 'Anonymous Resident',
    roomNumber: '',
    amount: 430,
    foodItem: 'Paneer Lababdar & Jeera Rice',
    timeAgo: '28 mins ago',
    roastComment: 'Expected ₹50 Diwali shagun bonus too',
  },
  {
    id: 'v5',
    name: 'Anonymous Resident',
    roomNumber: '',
    amount: 1199,
    foodItem: 'Kaju Katli (500g) + Veg Thali',
    timeAgo: '35 mins ago',
    roastComment: 'Forgot Sunny didn’t even fix the washroom tap',
  },
];

export const FUNNY_QUOTES = [
  {
    quote: "Paisa ped pe ugta hai kya re babu?!",
    author: "Sunny Bhaiya (Standing in Sadashiv PG lobby)",
  },
  {
    quote: "Last month Sunny didn't even recharge the 50 Mbps Wi-Fi, and you thought he's funding your Swiggy Gourmet?!",
    author: "Resident of Room 101",
  },
  {
    quote: "Tuesday subah 7:30 AM poha ready milega. Khana hai to khao, warna zinda raho.",
    author: "Sadashiv PG Mess Maharaj",
  },
  {
    quote: "Bill reject ho gaya because you didn't turn off your room geyser in 2023.",
    author: "Automated Audit Engine",
  },
];

export const DUMMY_BILLS = [
  {
    id: 'b1',
    title: 'Zomato Diwali Deluxe Feast',
    amount: 849,
    restaurant: 'Punjabi Zaika Dhaba',
    items: 'Dal Makhani, Butter Paneer, 4 Tandoori Butter Roti, Gulab Jamun',
  },
  {
    id: 'b2',
    title: 'Swiggy Biryani Dhamaka',
    amount: 670,
    restaurant: 'Hyderabadi Spice Kitchen',
    items: 'Dum Biryani, Extra Salan, Mirchi Ka Salan, Thums Up (750ml)',
  },
  {
    id: 'b3',
    title: 'Midnight Canteen Emergency Bill',
    amount: 320,
    restaurant: 'Chotu Chai & Maggi Point',
    items: 'Double Cheese Maggi (2), Egg Bhurji, 2 Cutting Chai',
  },
];

export const VERIFICATION_STEPS = [
  {
    title: 'Connecting to Sunny Bhaiya’s PhonePe & HDFC Current Account...',
    detail: 'Verifying UPI authorization key & Diwali emergency wallet limit',
  },
  {
    title: 'Scanning Sadashiv PG CCTV Feeds for Swiggy Delivery Bags...',
    detail: 'Checking if delivery boy entered via Main Gate or leaped over the boundary wall',
  },
  {
    title: 'Auditing Room Electricity Meter & Secret Kettle Usage...',
    detail: 'Cross-verifying if induction cooker was plugged in after midnight',
  },
  {
    title: 'Calculating GST, Diwali Shagun, and Sunny Bhaiya’s Margin...',
    detail: 'Subtracting ₹50 for that broken plastic chair in common lobby',
  },
  {
    title: 'APPROVAL 100% CONFIRMED! INITIATING DIRECT NEFT CASHBACK...',
    detail: 'Transferring funds from Sadashiv Management Trust to your UPI ID...',
  },
];
