import { IOption } from "../types";

export const timezones: string[] = [
  "Europe/Andorra",
  "Asia/Dubai",
  "Asia/Kabul",
  "Europe/Tirane",
  "Asia/Yerevan",
  "Antarctica/Casey",
  "Antarctica/Davis",
  "Antarctica/DumontDUrville",
  "Antarctica/Mawson",
  "Antarctica/Palmer",
  "Antarctica/Rothera",
  "Antarctica/Syowa",
  "Antarctica/Troll",
  "Antarctica/Vostok",
  "America/Argentina/Buenos_Aires",
  "America/Argentina/Cordoba",
  "America/Argentina/Salta",
  "America/Argentina/Jujuy",
  "America/Argentina/Tucuman",
  "America/Argentina/Catamarca",
  "America/Argentina/La_Rioja",
  "America/Argentina/San_Juan",
  "America/Argentina/Mendoza",
  "America/Argentina/San_Luis",
  "America/Argentina/Rio_Gallegos",
  "America/Argentina/Ushuaia",
  "Pacific/Pago_Pago",
  "Europe/Vienna",
  "Australia/Lord_Howe",
  "Antarctica/Macquarie",
  "Australia/Hobart",
  "Australia/Currie",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Broken_Hill",
  "Australia/Brisbane",
  "Australia/Lindeman",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Perth",
  "Australia/Eucla",
  "Asia/Baku",
  "America/Barbados",
  "Asia/Dhaka",
  "Europe/Brussels",
  "Europe/Sofia",
  "Atlantic/Bermuda",
  "Asia/Brunei",
  "America/La_Paz",
  "America/Noronha",
  "America/Belem",
  "America/Fortaleza",
  "America/Recife",
  "America/Araguaina",
  "America/Maceio",
  "America/Bahia",
  "America/Sao_Paulo",
  "America/Campo_Grande",
  "America/Cuiaba",
  "America/Santarem",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Manaus",
  "America/Eirunepe",
  "America/Rio_Branco",
  "America/Nassau",
  "Asia/Thimphu",
  "Europe/Minsk",
  "America/Belize",
  "America/St_Johns",
  "America/Halifax",
  "America/Glace_Bay",
  "America/Moncton",
  "America/Goose_Bay",
  "America/Blanc-Sablon",
  "America/Toronto",
  "America/Nipigon",
  "America/Thunder_Bay",
  "America/Iqaluit",
  "America/Pangnirtung",
  "America/Atikokan",
  "America/Winnipeg",
  "America/Rainy_River",
  "America/Resolute",
  "America/Rankin_Inlet",
  "America/Regina",
  "America/Swift_Current",
  "America/Edmonton",
  "America/Cambridge_Bay",
  "America/Yellowknife",
  "America/Inuvik",
  "America/Creston",
  "America/Dawson_Creek",
  "America/Fort_Nelson",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Dawson",
  "Indian/Cocos",
  "Europe/Zurich",
  "Africa/Abidjan",
  "Pacific/Rarotonga",
  "America/Santiago",
  "America/Punta_Arenas",
  "Pacific/Easter",
  "Asia/Shanghai",
  "Asia/Urumqi",
  "America/Bogota",
  "America/Costa_Rica",
  "America/Havana",
  "Atlantic/Cape_Verde",
  "America/Curacao",
  "Indian/Christmas",
  "Asia/Nicosia",
  "Asia/Famagusta",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "America/Santo_Domingo",
  "Africa/Algiers",
  "America/Guayaquil",
  "Pacific/Galapagos",
  "Europe/Tallinn",
  "Africa/Cairo",
  "Africa/El_Aaiun",
  "Europe/Madrid",
  "Africa/Ceuta",
  "Atlantic/Canary",
  "Europe/Helsinki",
  "Pacific/Fiji",
  "Atlantic/Stanley",
  "Pacific/Chuuk",
  "Pacific/Pohnpei",
  "Pacific/Kosrae",
  "Atlantic/Faroe",
  "Europe/Paris",
  "Europe/London",
  "Asia/Tbilisi",
  "America/Cayenne",
  "Africa/Accra",
  "Europe/Gibraltar",
  "America/Godthab",
  "America/Danmarkshavn",
  "America/Scoresbysund",
  "America/Thule",
  "Europe/Athens",
  "Atlantic/South_Georgia",
  "America/Guatemala",
  "Pacific/Guam",
  "Africa/Bissau",
  "America/Guyana",
  "Asia/Hong_Kong",
  "America/Tegucigalpa",
  "America/Port-au-Prince",
  "Europe/Budapest",
  "Asia/Jakarta",
  "Asia/Pontianak",
  "Asia/Makassar",
  "Asia/Jayapura",
  "Europe/Dublin",
  "Asia/Jerusalem",
  "Asia/Kolkata",
  "Indian/Chagos",
  "Asia/Baghdad",
  "Asia/Tehran",
  "Atlantic/Reykjavik",
  "Europe/Rome",
  "America/Jamaica",
  "Asia/Amman",
  "Asia/Tokyo",
  "Africa/Nairobi",
  "Asia/Bishkek",
  "Pacific/Tarawa",
  "Pacific/Enderbury",
  "Pacific/Kiritimati",
  "Asia/Pyongyang",
  "Asia/Seoul",
  "Asia/Almaty",
  "Asia/Qyzylorda",
  "Asia/Qostanay", // https://bugs.chromium.org/p/chromium/issues/detail?id=928068
  "Asia/Aqtobe",
  "Asia/Aqtau",
  "Asia/Atyrau",
  "Asia/Oral",
  "Asia/Beirut",
  "Asia/Colombo",
  "Africa/Monrovia",
  "Europe/Vilnius",
  "Europe/Luxembourg",
  "Europe/Riga",
  "Africa/Tripoli",
  "Africa/Casablanca",
  "Europe/Monaco",
  "Europe/Chisinau",
  "Pacific/Majuro",
  "Pacific/Kwajalein",
  "Asia/Yangon",
  "Asia/Ulaanbaatar",
  "Asia/Hovd",
  "Asia/Choibalsan",
  "Asia/Macau",
  "America/Martinique",
  "Europe/Malta",
  "Indian/Mauritius",
  "Indian/Maldives",
  "America/Mexico_City",
  "America/Cancun",
  "America/Merida",
  "America/Monterrey",
  "America/Matamoros",
  "America/Mazatlan",
  "America/Chihuahua",
  "America/Ojinaga",
  "America/Hermosillo",
  "America/Tijuana",
  "America/Bahia_Banderas",
  "Asia/Kuala_Lumpur",
  "Asia/Kuching",
  "Africa/Maputo",
  "Africa/Windhoek",
  "Pacific/Noumea",
  "Pacific/Norfolk",
  "Africa/Lagos",
  "America/Managua",
  "Europe/Amsterdam",
  "Europe/Oslo",
  "Asia/Kathmandu",
  "Pacific/Nauru",
  "Pacific/Niue",
  "Pacific/Auckland",
  "Pacific/Chatham",
  "America/Panama",
  "America/Lima",
  "Pacific/Tahiti",
  "Pacific/Marquesas",
  "Pacific/Gambier",
  "Pacific/Port_Moresby",
  "Pacific/Bougainville",
  "Asia/Manila",
  "Asia/Karachi",
  "Europe/Warsaw",
  "America/Miquelon",
  "Pacific/Pitcairn",
  "America/Puerto_Rico",
  "Asia/Gaza",
  "Asia/Hebron",
  "Europe/Lisbon",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Pacific/Palau",
  "America/Asuncion",
  "Asia/Qatar",
  "Indian/Reunion",
  "Europe/Bucharest",
  "Europe/Belgrade",
  "Europe/Kaliningrad",
  "Europe/Moscow",
  "Europe/Simferopol",
  "Europe/Kirov",
  "Europe/Astrakhan",
  "Europe/Volgograd",
  "Europe/Saratov",
  "Europe/Ulyanovsk",
  "Europe/Samara",
  "Asia/Yekaterinburg",
  "Asia/Omsk",
  "Asia/Novosibirsk",
  "Asia/Barnaul",
  "Asia/Tomsk",
  "Asia/Novokuznetsk",
  "Asia/Krasnoyarsk",
  "Asia/Irkutsk",
  "Asia/Chita",
  "Asia/Yakutsk",
  "Asia/Khandyga",
  "Asia/Vladivostok",
  "Asia/Ust-Nera",
  "Asia/Magadan",
  "Asia/Sakhalin",
  "Asia/Srednekolymsk",
  "Asia/Kamchatka",
  "Asia/Anadyr",
  "Asia/Riyadh",
  "Pacific/Guadalcanal",
  "Indian/Mahe",
  "Africa/Khartoum",
  "Europe/Stockholm",
  "Asia/Singapore",
  "America/Paramaribo",
  "Africa/Juba",
  "Africa/Sao_Tome",
  "America/El_Salvador",
  "Asia/Damascus",
  "America/Grand_Turk",
  "Africa/Ndjamena",
  "Indian/Kerguelen",
  "Asia/Bangkok",
  "Asia/Dushanbe",
  "Pacific/Fakaofo",
  "Asia/Dili",
  "Asia/Ashgabat",
  "Africa/Tunis",
  "Pacific/Tongatapu",
  "Europe/Istanbul",
  "America/Port_of_Spain",
  "Pacific/Funafuti",
  "Asia/Taipei",
  "Europe/Kiev",
  "Europe/Uzhgorod",
  "Europe/Zaporozhye",
  "Pacific/Wake",
  "America/New_York",
  "America/Detroit",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Indiana/Indianapolis",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Chicago",
  "America/Indiana/Tell_City",
  "America/Indiana/Knox",
  "America/Menominee",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/North_Dakota/Beulah",
  "America/Denver",
  "America/Boise",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Juneau",
  "America/Sitka",
  "America/Metlakatla",
  "America/Yakutat",
  "America/Nome",
  "America/Adak",
  "Pacific/Honolulu",
  "America/Montevideo",
  "Asia/Samarkand",
  "Asia/Tashkent",
  "America/Caracas",
  "Asia/Ho_Chi_Minh",
  "Pacific/Efate",
  "Pacific/Wallis",
  "Pacific/Apia",
  "Africa/Johannesburg",
];

export const languages: IOption[] = [
  { name: "English", code: "en" },
  { name: "French - français", code: "fr" },
  { name: "German - Deutsch", code: "de" },
  { name: "Italian - italiano", code: "it" },
  { name: "Portuguese - português", code: "pt" },
  { name: "Russian - русский", code: "ru" },
  { name: "Spanish - español", code: "es" },
  { name: "Turkish - Türkçe", code: "tr" },
];

export const currencies: { name: string; symbol: string }[] = [
  {
    name: "Afghanistan - ؋  (AFN)",
    symbol: "؋",
  },
  {
    name: "Aland Islands - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Albania - Lek  (ALL)",
    symbol: "Lek",
  },
  {
    name: "Algeria - دج  (DZD)",
    symbol: "دج",
  },
  {
    name: "American Samoa - $  (USD)",
    symbol: "$",
  },
  {
    name: "Andorra - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Angola - Kz  (AOA)",
    symbol: "Kz",
  },
  {
    name: "Anguilla - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Antarctica - $  (AAD)",
    symbol: "$",
  },
  {
    name: "Antigua and Barbuda - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Argentina - $  (ARS)",
    symbol: "$",
  },
  {
    name: "Armenia - ֏  (AMD)",
    symbol: "֏",
  },
  {
    name: "Aruba - ƒ  (AWG)",
    symbol: "ƒ",
  },
  {
    name: "Australia - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Austria - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Azerbaijan - m  (AZN)",
    symbol: "m",
  },
  {
    name: "Bahamas - B$  (BSD)",
    symbol: "B$",
  },
  {
    name: "Bahrain - .د.ب  (BHD)",
    symbol: ".د.ب",
  },
  {
    name: "Bangladesh - ৳  (BDT)",
    symbol: "৳",
  },
  {
    name: "Barbados - Bds$  (BBD)",
    symbol: "Bds$",
  },
  {
    name: "Belarus - Br  (BYN)",
    symbol: "Br",
  },
  {
    name: "Belgium - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Belize - $  (BZD)",
    symbol: "$",
  },
  {
    name: "Benin - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Bermuda - $  (BMD)",
    symbol: "$",
  },
  {
    name: "Bhutan - Nu.  (BTN)",
    symbol: "Nu.",
  },
  {
    name: "Bolivia - Bs.  (BOB)",
    symbol: "Bs.",
  },
  {
    name: "Bonaire, Sint Eustatius and Saba - $  (USD)",
    symbol: "$",
  },
  {
    name: "Bosnia and Herzegovina - KM  (BAM)",
    symbol: "KM",
  },
  {
    name: "Botswana - P  (BWP)",
    symbol: "P",
  },
  {
    name: "Bouvet Island - kr  (NOK)",
    symbol: "kr",
  },
  {
    name: "Brazil - R$  (BRL)",
    symbol: "R$",
  },
  {
    name: "British Indian Ocean Territory - $  (USD)",
    symbol: "$",
  },
  {
    name: "Brunei Darussalam - B$  (BND)",
    symbol: "B$",
  },
  {
    name: "Bulgaria - Лв.  (BGN)",
    symbol: "Лв.",
  },
  {
    name: "Burkina Faso - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Burundi - FBu  (BIF)",
    symbol: "FBu",
  },
  {
    name: "Cambodia - KHR  (KHR)",
    symbol: "KHR",
  },
  {
    name: "Cameroon - FCFA  (XAF)",
    symbol: "FCFA",
  },
  {
    name: "Canada - $  (CAD)",
    symbol: "$",
  },
  {
    name: "Cape Verde - $  (CVE)",
    symbol: "$",
  },
  {
    name: "Cayman Islands - $  (KYD)",
    symbol: "$",
  },
  {
    name: "Central African Republic - FCFA  (XAF)",
    symbol: "FCFA",
  },
  {
    name: "Chad - FCFA  (XAF)",
    symbol: "FCFA",
  },
  {
    name: "Chile - $  (CLP)",
    symbol: "$",
  },
  {
    name: "China - ¥  (CNY)",
    symbol: "¥",
  },
  {
    name: "Christmas Island - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Cocos (Keeling) Islands - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Colombia - $  (COP)",
    symbol: "$",
  },
  {
    name: "Comoros - CF  (KMF)",
    symbol: "CF",
  },
  {
    name: "Congo - FC  (XAF)",
    symbol: "FC",
  },
  {
    name: "Congo, Democratic Republic of the Congo - FC  (CDF)",
    symbol: "FC",
  },
  {
    name: "Cook Islands - $  (NZD)",
    symbol: "$",
  },
  {
    name: "Costa Rica - ₡  (CRC)",
    symbol: "₡",
  },
  {
    name: "Cote D'Ivoire - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Croatia - kn  (HRK)",
    symbol: "kn",
  },
  {
    name: "Cuba - $  (CUP)",
    symbol: "$",
  },
  {
    name: "Curacao - ƒ  (ANG)",
    symbol: "ƒ",
  },
  {
    name: "Cyprus - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Czech Republic - Kč  (CZK)",
    symbol: "Kč",
  },
  {
    name: "Denmark - Kr.  (DKK)",
    symbol: "Kr.",
  },
  {
    name: "Djibouti - Fdj  (DJF)",
    symbol: "Fdj",
  },
  {
    name: "Dominica - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Dominican Republic - $  (DOP)",
    symbol: "$",
  },
  {
    name: "Ecuador - $  (USD)",
    symbol: "$",
  },
  {
    name: "Egypt - ج.م  (EGP)",
    symbol: "ج.م",
  },
  {
    name: "El Salvador - $  (USD)",
    symbol: "$",
  },
  {
    name: "Equatorial Guinea - FCFA  (XAF)",
    symbol: "FCFA",
  },
  {
    name: "Eritrea - Nfk  (ERN)",
    symbol: "Nfk",
  },
  {
    name: "Estonia - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Ethiopia - Nkf  (ETB)",
    symbol: "Nkf",
  },
  {
    name: "Falkland Islands (Malvinas) - £  (FKP)",
    symbol: "£",
  },
  {
    name: "Faroe Islands - Kr.  (DKK)",
    symbol: "Kr.",
  },
  {
    name: "Fiji - FJ$  (FJD)",
    symbol: "FJ$",
  },
  {
    name: "Finland - €  (EUR)",
    symbol: "€",
  },
  {
    name: "France - €  (EUR)",
    symbol: "€",
  },
  {
    name: "French Guiana - €  (EUR)",
    symbol: "€",
  },
  {
    name: "French Polynesia - ₣  (XPF)",
    symbol: "₣",
  },
  {
    name: "French Southern Territories - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Gabon - FCFA  (XAF)",
    symbol: "FCFA",
  },
  {
    name: "Gambia - D  (GMD)",
    symbol: "D",
  },
  {
    name: "Georgia - ლ  (GEL)",
    symbol: "ლ",
  },
  {
    name: "Germany - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Ghana - GH₵  (GHS)",
    symbol: "GH₵",
  },
  {
    name: "Gibraltar - £  (GIP)",
    symbol: "£",
  },
  {
    name: "Greece - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Greenland - Kr.  (DKK)",
    symbol: "Kr.",
  },
  {
    name: "Grenada - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Guadeloupe - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Guam - $  (USD)",
    symbol: "$",
  },
  {
    name: "Guatemala - Q  (GTQ)",
    symbol: "Q",
  },
  {
    name: "Guernsey - £  (GBP)",
    symbol: "£",
  },
  {
    name: "Guinea - FG  (GNF)",
    symbol: "FG",
  },
  {
    name: "Guinea-Bissau - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Guyana - $  (GYD)",
    symbol: "$",
  },
  {
    name: "Haiti - G  (HTG)",
    symbol: "G",
  },
  {
    name: "Heard Island and McDonald Islands - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Holy See (Vatican City State) - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Honduras - L  (HNL)",
    symbol: "L",
  },
  {
    name: "Hong Kong - $  (HKD)",
    symbol: "$",
  },
  {
    name: "Hungary - Ft  (HUF)",
    symbol: "Ft",
  },
  {
    name: "Iceland - kr  (ISK)",
    symbol: "kr",
  },
  {
    name: "India - ₹  (INR)",
    symbol: "₹",
  },
  {
    name: "Indonesia - Rp  (IDR)",
    symbol: "Rp",
  },
  {
    name: "Iran, Islamic Republic of - ﷼  (IRR)",
    symbol: "﷼",
  },
  {
    name: "Iraq - د.ع  (IQD)",
    symbol: "د.ع",
  },
  {
    name: "Ireland - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Isle of Man - £  (GBP)",
    symbol: "£",
  },
  {
    name: "Israel - ₪  (ILS)",
    symbol: "₪",
  },
  {
    name: "Italy - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Jamaica - J$  (JMD)",
    symbol: "J$",
  },
  {
    name: "Japan - ¥  (JPY)",
    symbol: "¥",
  },
  {
    name: "Jersey - £  (GBP)",
    symbol: "£",
  },
  {
    name: "Jordan - ا.د  (JOD)",
    symbol: "ا.د",
  },
  {
    name: "Kazakhstan - лв  (KZT)",
    symbol: "лв",
  },
  {
    name: "Kenya - KSh  (KES)",
    symbol: "KSh",
  },
  {
    name: "Kiribati - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Korea, Democratic People's Republic of - ₩  (KPW)",
    symbol: "₩",
  },
  {
    name: "Korea, Republic of - ₩  (KRW)",
    symbol: "₩",
  },
  {
    name: "Kosovo - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Kuwait - ك.د  (KWD)",
    symbol: "ك.د",
  },
  {
    name: "Kyrgyzstan - лв  (KGS)",
    symbol: "лв",
  },
  {
    name: "Lao People's Democratic Republic - ₭  (LAK)",
    symbol: "₭",
  },
  {
    name: "Latvia - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Lebanon - £  (LBP)",
    symbol: "£",
  },
  {
    name: "Lesotho - L  (LSL)",
    symbol: "L",
  },
  {
    name: "Liberia - $  (LRD)",
    symbol: "$",
  },
  {
    name: "Libyan Arab Jamahiriya - د.ل  (LYD)",
    symbol: "د.ل",
  },
  {
    name: "Liechtenstein - CHf  (CHF)",
    symbol: "CHf",
  },
  {
    name: "Lithuania - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Luxembourg - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Macao - $  (MOP)",
    symbol: "$",
  },
  {
    name: "Macedonia, the Former Yugoslav Republic of - ден  (MKD)",
    symbol: "ден",
  },
  {
    name: "Madagascar - Ar  (MGA)",
    symbol: "Ar",
  },
  {
    name: "Malawi - MK  (MWK)",
    symbol: "MK",
  },
  {
    name: "Malaysia - RM  (MYR)",
    symbol: "RM",
  },
  {
    name: "Maldives - Rf  (MVR)",
    symbol: "Rf",
  },
  {
    name: "Mali - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Malta - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Marshall Islands - $  (USD)",
    symbol: "$",
  },
  {
    name: "Martinique - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Mauritania - MRU  (MRO)",
    symbol: "MRU",
  },
  {
    name: "Mauritius - ₨  (MUR)",
    symbol: "₨",
  },
  {
    name: "Mayotte - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Mexico - $  (MXN)",
    symbol: "$",
  },
  {
    name: "Micronesia, Federated States of - $  (USD)",
    symbol: "$",
  },
  {
    name: "Moldova, Republic of - L  (MDL)",
    symbol: "L",
  },
  {
    name: "Monaco - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Mongolia - ₮  (MNT)",
    symbol: "₮",
  },
  {
    name: "Montenegro - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Montserrat - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Morocco - DH  (MAD)",
    symbol: "DH",
  },
  {
    name: "Mozambique - MT  (MZN)",
    symbol: "MT",
  },
  {
    name: "Myanmar - K  (MMK)",
    symbol: "K",
  },
  {
    name: "Namibia - $  (NAD)",
    symbol: "$",
  },
  {
    name: "Nauru - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Nepal - ₨  (NPR)",
    symbol: "₨",
  },
  {
    name: "Netherlands - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Netherlands Antilles - NAf  (ANG)",
    symbol: "NAf",
  },
  {
    name: "New Caledonia - ₣  (XPF)",
    symbol: "₣",
  },
  {
    name: "New Zealand - $  (NZD)",
    symbol: "$",
  },
  {
    name: "Nicaragua - C$  (NIO)",
    symbol: "C$",
  },
  {
    name: "Niger - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Nigeria - ₦  (NGN)",
    symbol: "₦",
  },
  {
    name: "Niue - $  (NZD)",
    symbol: "$",
  },
  {
    name: "Norfolk Island - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Northern Mariana Islands - $  (USD)",
    symbol: "$",
  },
  {
    name: "Norway - kr  (NOK)",
    symbol: "kr",
  },
  {
    name: "Oman - .ع.ر  (OMR)",
    symbol: ".ع.ر",
  },
  {
    name: "Pakistan - ₨  (PKR)",
    symbol: "₨",
  },
  {
    name: "Palau - $  (USD)",
    symbol: "$",
  },
  {
    name: "Palestinian Territory, Occupied - ₪  (ILS)",
    symbol: "₪",
  },
  {
    name: "Panama - B/.  (PAB)",
    symbol: "B/.",
  },
  {
    name: "Papua New Guinea - K  (PGK)",
    symbol: "K",
  },
  {
    name: "Paraguay - ₲  (PYG)",
    symbol: "₲",
  },
  {
    name: "Peru - S/.  (PEN)",
    symbol: "S/.",
  },
  {
    name: "Philippines - ₱  (PHP)",
    symbol: "₱",
  },
  {
    name: "Pitcairn - $  (NZD)",
    symbol: "$",
  },
  {
    name: "Poland - zł  (PLN)",
    symbol: "zł",
  },
  {
    name: "Portugal - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Puerto Rico - $  (USD)",
    symbol: "$",
  },
  {
    name: "Qatar - ق.ر  (QAR)",
    symbol: "ق.ر",
  },
  {
    name: "Reunion - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Romania - lei  (RON)",
    symbol: "lei",
  },
  {
    name: "Russian Federation - ₽  (RUB)",
    symbol: "₽",
  },
  {
    name: "Rwanda - FRw  (RWF)",
    symbol: "FRw",
  },
  {
    name: "Saint Barthelemy - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Saint Helena - £  (SHP)",
    symbol: "£",
  },
  {
    name: "Saint Kitts and Nevis - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Saint Lucia - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Saint Martin - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Saint Pierre and Miquelon - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Saint Vincent and the Grenadines - $  (XCD)",
    symbol: "$",
  },
  {
    name: "Samoa - SAT  (WST)",
    symbol: "SAT",
  },
  {
    name: "San Marino - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Sao Tome and Principe - Db  (STD)",
    symbol: "Db",
  },
  {
    name: "Saudi Arabia - ﷼  (SAR)",
    symbol: "﷼",
  },
  {
    name: "Senegal - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Serbia - din  (RSD)",
    symbol: "din",
  },
  {
    name: "Serbia and Montenegro - din  (RSD)",
    symbol: "din",
  },
  {
    name: "Seychelles - SRe  (SCR)",
    symbol: "SRe",
  },
  {
    name: "Sierra Leone - Le  (SLL)",
    symbol: "Le",
  },
  {
    name: "Singapore - $  (SGD)",
    symbol: "$",
  },
  {
    name: "St Martin - ƒ  (ANG)",
    symbol: "ƒ",
  },
  {
    name: "Slovakia - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Slovenia - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Solomon Islands - Si$  (SBD)",
    symbol: "Si$",
  },
  {
    name: "Somalia - Sh.so.  (SOS)",
    symbol: "Sh.so.",
  },
  {
    name: "South Africa - R  (ZAR)",
    symbol: "R",
  },
  {
    name: "South Georgia and the South Sandwich Islands - £  (GBP)",
    symbol: "£",
  },
  {
    name: "South Sudan - £  (SSP)",
    symbol: "£",
  },
  {
    name: "Spain - €  (EUR)",
    symbol: "€",
  },
  {
    name: "Sri Lanka - Rs  (LKR)",
    symbol: "Rs",
  },
  {
    name: "Sudan - .س.ج  (SDG)",
    symbol: ".س.ج",
  },
  {
    name: "Suriname - $  (SRD)",
    symbol: "$",
  },
  {
    name: "Svalbard and Jan Mayen - kr  (NOK)",
    symbol: "kr",
  },
  {
    name: "Swaziland - E  (SZL)",
    symbol: "E",
  },
  {
    name: "Sweden - kr  (SEK)",
    symbol: "kr",
  },
  {
    name: "Switzerland - CHf  (CHF)",
    symbol: "CHf",
  },
  {
    name: "Syrian Arab Republic - LS  (SYP)",
    symbol: "LS",
  },
  {
    name: "Taiwan, Province of China - $  (TWD)",
    symbol: "$",
  },
  {
    name: "Tajikistan - SM  (TJS)",
    symbol: "SM",
  },
  {
    name: "Tanzania, United Republic of - TSh  (TZS)",
    symbol: "TSh",
  },
  {
    name: "Thailand - ฿  (THB)",
    symbol: "฿",
  },
  {
    name: "Timor-Leste - $  (USD)",
    symbol: "$",
  },
  {
    name: "Togo - CFA  (XOF)",
    symbol: "CFA",
  },
  {
    name: "Tokelau - $  (NZD)",
    symbol: "$",
  },
  {
    name: "Tonga - $  (TOP)",
    symbol: "$",
  },
  {
    name: "Trinidad and Tobago - $  (TTD)",
    symbol: "$",
  },
  {
    name: "Tunisia - ت.د  (TND)",
    symbol: "ت.د",
  },
  {
    name: "Turkey - ₺  (TRY)",
    symbol: "₺",
  },
  {
    name: "Turkmenistan - T  (TMT)",
    symbol: "T",
  },
  {
    name: "Turks and Caicos Islands - $  (USD)",
    symbol: "$",
  },
  {
    name: "Tuvalu - $  (AUD)",
    symbol: "$",
  },
  {
    name: "Uganda - USh  (UGX)",
    symbol: "USh",
  },
  {
    name: "Ukraine - ₴  (UAH)",
    symbol: "₴",
  },
  {
    name: "United Arab Emirates - إ.د  (AED)",
    symbol: "إ.د",
  },
  {
    name: "United Kingdom - £  (GBP)",
    symbol: "£",
  },
  {
    name: "United States - $  (USD)",
    symbol: "$",
  },
  {
    name: "United States Minor Outlying Islands - $  (USD)",
    symbol: "$",
  },
  {
    name: "Uruguay - $  (UYU)",
    symbol: "$",
  },
  {
    name: "Uzbekistan - лв  (UZS)",
    symbol: "лв",
  },
  {
    name: "Vanuatu - VT  (VUV)",
    symbol: "VT",
  },
  {
    name: "Venezuela - Bs  (VEF)",
    symbol: "Bs",
  },
  {
    name: "Viet Nam - ₫  (VND)",
    symbol: "₫",
  },
  {
    name: "Virgin Islands, British - $  (USD)",
    symbol: "$",
  },
  {
    name: "Virgin Islands, U.s. - $  (USD)",
    symbol: "$",
  },
  {
    name: "Wallis and Futuna - ₣  (XPF)",
    symbol: "₣",
  },
  {
    name: "Western Sahara - MAD  (MAD)",
    symbol: "MAD",
  },
  {
    name: "Yemen - ﷼  (YER)",
    symbol: "﷼",
  },
  {
    name: "Zambia - ZK  (ZMW)",
    symbol: "ZK",
  },
  {
    name: "Zimbabwe - $  (ZWL)",
    symbol: "$",
  },
];
