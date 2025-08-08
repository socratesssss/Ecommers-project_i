interface DistrictData {
  upazilas: string[];

}

interface DivisionData {
  districts: {
    [district: string]: DistrictData;
  };
      deliveryCost: number;
}

interface LocationData {
  [country: string]: {
    [division: string]: DivisionData;
  };
}

const Locations: LocationData = {
  Bangladesh: {
    Dhaka: {
      districts: {
        "Dhaka": {
          upazilas: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar", "Dhaka City"],

        },
        "Faridpur": {
          upazilas: ["Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
      
        },
        "Gazipur": {
          upazilas: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
     
        },
        "Kishoreganj": {
          upazilas: ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
        
        },
        "Manikganj": {
          upazilas: ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shibalaya", "Singair"],
        
        },
        "Munshiganj": {
          upazilas: ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
      
        },
        "Narayanganj": {
          upazilas: ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
       
        },
        "Narsingdi": {
          upazilas: ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
        
        },
        "Tangail": {
          upazilas: ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
         
        }
      },
          deliveryCost: 70
    },
    Chattogram: {
      districts: {
        "Chattogram": {
          upazilas: ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda", "Chattogram City"],
       
        },
        "Cox's Bazar": {
          upazilas: ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Ramu", "Teknaf", "Ukhia"],
        
        },
        "Bandarban": {
          upazilas: ["Ali Kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
       
        },
        "Khagrachhari": {
          upazilas: ["Dighinala", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
       
        },
        "Rangamati": {
          upazilas: ["Bagaichhari", "Barkal", "Kawkhali", "Langadu", "Naniarchar", "Rangamati Sadar", "Rajasthali"],
       
        }
      },
      deliveryCost: 80
    },
    Khulna: {
      districts: {
        "Khulna": {
          upazilas: ["Batiaghata", "Dacope", "Dighalia", "Dumuria", "Koira", "Paikgachha", "Phultala", "Rupsa", "Terokhada", "Khulna City"],
        
        },
        "Bagerhat": {
          upazilas: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
        
        },
        "Chuadanga": {
          upazilas: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
         
        },
        "Jessore": {
          upazilas: ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargacha", "Keshabpur", "Jessore Sadar", "Manirampur", "Sharsha"],
         
        },
        "Jhenaidah": {
          upazilas: ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
        
        },
        "Kushtia": {
          upazilas: ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
         
        },
        "Magura": {
          upazilas: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
      
        },
        "Meherpur": {
          upazilas: ["Gangni", "Meherpur Sadar", "Mujibnagar"],
       
        },
        "Narail": {
          upazilas: ["Kalia", "Lohagara", "Narail Sadar"],

        },
        "Satkhira": {
          upazilas: ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"],
      
        }
      },
      deliveryCost: 130
    },
    Rajshahi: {
      districts: {
        "Rajshahi": {
          upazilas: ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore", "Rajshahi City"],
       
        },
        "Bogura": {
          upazilas: ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Sherpur", "Shibganj", "Sonatala"],
      
        },
        "Chapai Nawabganj": {
          upazilas: ["Bholahat", "Gomastapur", "Nachole", "Chapai Nawabganj Sadar", "Shibganj"],
        
        },
        "Joypurhat": {
          upazilas: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
        
        },
        "Naogaon": {
          upazilas: ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
          
        },
        "Natore": {
          upazilas: ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Natore Sadar", "Singra"],
       
        },
        "Pabna": {
          upazilas: ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
         
        },
        "Sirajganj": {
          upazilas: ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"],

        }
      },
      deliveryCost: 130
    },
    Barisal: {
      districts: {
        "Barisal": {
          upazilas: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Barisal Sadar", "Barisal City"],
         
        },
        "Bhola": {
          upazilas: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
    
        },
        "Jhalokati": {
          upazilas: ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
      
        },
        "Patuakhali": {
          upazilas: ["Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
     
        },
        "Pirojpur": {
          upazilas: ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Pirojpur Sadar", "Nesarabad", "Zianagar"],

        }
      },
      deliveryCost: 130
    },
    Sylhet: {
      districts: {
        "Sylhet": {
          upazilas: ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj", "Sylhet Sadar", "Sylhet City"],
       
        },
        "Habiganj": {
          upazilas: ["Ajmiriganj", "Bahubal", "Baniyachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj"],

        },
        "Moulvibazar": {
          upazilas: ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
     
        },
        "Sunamganj": {
          upazilas: ["Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur"],

        }
      },
      deliveryCost: 130
    },
    Rangpur: {
      districts: {
        "Rangpur": {
          upazilas: ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj", "Rangpur City"],
   
        },
        "Dinajpur": {
          upazilas: ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Dinajpur Sadar", "Nawabganj", "Parbatipur"],
   
        },
        "Gaibandha": {
          upazilas: ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],

        },
        "Kurigram": {
          upazilas: ["Bhurungamari", "Char Rajibpur", "Chilmari", "Phulbari", "Kurigram Sadar", "Nageshwari", "Rajarhat", "Raomari", "Ulipur"],
        
        },
        "Lalmonirhat": {
          upazilas: ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
         
        },
        "Nilphamari": {
          upazilas: ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
          
        },
        "Panchagarh": {
          upazilas: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
      
        },
        "Thakurgaon": {
          upazilas: ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],
       
        }
      },
      deliveryCost: 130
    },
    Mymensingh: {
      districts: {
        "Mymensingh": {
          upazilas: ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gouripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Mymensingh Sadar", "Nandail", "Phulpur", "Trishal", "Mymensingh City"],
      
        },
        "Jamalpur": {
          upazilas: ["Baksiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
       
        },
        "Netrokona": {
          upazilas: ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
      
        },
        "Sherpur": {
          upazilas: ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],
       
        }
      },
      deliveryCost: 130
    }
  }
} as const;

export default Locations;