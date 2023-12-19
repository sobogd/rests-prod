const i18nEn = {
  menu: {
    names: {
      AUTHORIZATION: "Yetkilendirme",
      COMPANY: "Şirket",
      ORDERS: "Siparişler",
      TABLES: "Restoran haritası",
      ELEMENTS: "Elementler",
      CATEGORIES: "Kategoriler",
      KITCHEN: "Mutfak",
      POSITIONS: "Öğeler",
      USERS: "Kullanıcılar",
      CASH_REPORT_MAKE: "Kasa raporu",
      CASH_REPORT_HISTORY: "Nakit geçmişi",
      STATS: "İstatistikler",
      BILLING: "Faturalandırma",
      DAY_STATS: "Günlük siparişler",
      PERIOD: "Dönem siparişleri",
      METHODS: "Ödeme yöntemleri",
      logout: "Oturumu kapat",
      fullscreen: "Tam ekran modu",
    },
  },
  orders: {
    positionDialogTitle: "Öğe için eylem",
    orderDialogTitle: "Sipariş için eylem",
    finishOrder: "Siparişi tamamla",
    printBill: "Faturayı yazdır (test)",
    splitOrder: "Siparişi böl",
    splitOrderMin: "Minimum bir öğe seçin",
    editComment: "Yorumu düzenle",
    addComment: "Yorum ekle",
    tableChange: "Tabloyu değiştir",
    changeDiscount: "İndirimi değiştir",
    addDiscount: "İndirim uygula",
    removeOrder: "Siparişi kaldır",
    removeOrderForever: "Bu siparişi kalıcı olarak kaldır",
    removeOrderCancel: "Kaldırmayı iptal et",
    editPosition: "Öğeyi düzenle",
    clonePosition: "Öğeyi kopyala",
    removePosition: "Öğeyi kaldır",
    addPosition: "Yeni öğe ekle",
    areSure: "Emin misin?",
    cancel: "İptal",
    emptyPositions: "Bu sipariş için ürününüz yok.",
    emptyOrders: "Bu tablo için siparişiniz yok.",
    newTitle: "Yeni sipariş",
    editTitle: "Sipariş #{{orderNumber}}",
    commentTitle: "Sipariş için yorum yapın",
    commentPositionTitle: "Öğe için yorum",
    commentType: "Buraya bir yorum yazın...",
    commentButton: "Kaydet",
    totalTitle: "Toplam:",
    splitTitle: "Bölünecek öğeleri seçin",
    splitButton: "Siparişi böl",
    selectMethod: "Ödeme yöntemini seçin",
    selectMethodMin: "Minimum bir ödeme yöntemi seçin",
    customMethod: "Özel ödeme yöntemi",
    customMethodInput: "Ödeme yöntemi başlığını girin",
    finishButton: "Siparişi tamamla",
    discountTitle: "Bir ürün için indirim",
    discountOrderTitle: "Tüm siparişler için indirim",
    byPerc: "Yüzdeye göre",
    byAmou: "Miktar bazında",
    inputAmount: "Giriş tutarı",
    discountButton: "İndirim uygula",
    next: "Devam et",
    save: "Kaydet",
    posModPosTitle: "Öğeyi seç",
    posModVarTitle: "Seçenek seçin",
    posModOptTitle: "Seçenekler ekle",
    posModComTitle: "Yorum ekle",
    posModCatTitle: "Kategori seç",
    tabModTitle: "Tablo siparişleri",
    tabModItems: "Öğeler",
    tabModBeforeOrd: "Sipariş No",
    tabModNoComment: "Sipariş için yorum yok",
    tabModButton: "Yeni sipariş ekle",
    priority: "Öncelik",
  },
  priority: {
    first: "Öncelikle",
    second: "İkincisi",
    no: "Önceliksiz",
  },
  categories: {
    list: {
      title: "Kategoriler",
      search: "Kategori başlığı",
      sort: "Sırala",
      add: "Yeni kategori ekle",
      empty: "Kategori bulunamadı",
      remove: "Kaldır",
      edit: "Düzenle",
      dialog: "Kategori eylemleri",
      update: "Kategorileri güncelle",
    },
    form: {
      new: "Yeni kategori",
      edit: "Kategoriyi düzenle",
      save: "Kategoriyi kaydet",
      name: "Başlık",
      sort: "Sırala",
      description: "Açıklama",
      translations: {
        translation: "Başlık çevirisi açık ",
        addTranslation: "Çeviri ekle",
        removeTranslation: "Çevirileri kaldır",
      },
      remove: "Kategoriyi kaldır",
      nameReq: "Başlık gerekli",
      descriptionReq: "Açıklama gerekli",
      sortReq: "Sıralama numarası gerekli",
    },
  },
  items: {
    list: {
      title: "Öğe listesi",
      subtitle: "Kategoriye ilişkin öğelerin listesi",
      search: "Öğeleri ara",
      update: "Öğe listesini güncelle",
      sort: "Sırala",
      price: "Fiyat",
      add: "Yeni öğe ekle",
      empty: "Öğe bulunamadı",
      remove: "Kaldır",
      clone: "Klon",
      edit: "Düzenle",
    },
    form: {
      new: "Yeni öğe",
      edit: "Öğeyi düzenle",
      remove: "Öğeyi kaldır",
      copy: "Copy item",
      errors: {
        require: "Alan gereklidir",
        numbers: "Yalnızca sayılar ve noktalar kabul edilir",
      },
      general: {
        title: "Genel",
        n: "Başlık",
        non: "Başlık açık ",
        c: "Bir kategori seçin",
        d: "Açıklama",
        i: "Talimatlar",
        p: "Minimum fiyat",
        s: "Sıralama numarası",
        h: "Genel menüde gizlenir",
        a: "Genel menüde gizlenir",
      },
      variants: {
        title: "Seçenekler",
        subtitle: "Öğeniz için seçenekler ekleyin",
        name: "Seçenek başlığı açık ",
        price: "Ek fiyat",
        countryCode: "Dil",
        translation: "Seçenek başlığı açık ",
        addTranslation: "Çeviri ekle",
        addVariant: "Gerekli seçeneği ekle",
      },
      options: {
        title: "Seçenekler",
        subtitle: "Öğeniz için ilaveler ekleyin",
        name: "Seçenek başlığı açık ",
        price: "Ek fiyat",
        countryCode: "Dil",
        translation: "Seçenek başlığı açık ",
        addTranslation: "Çeviri ekle",
        addOption: "Ekstra seçenek ekle",
      },
      translations: {
        title: "Başlık çevirisi",
        subtitle: "Öğe başlığınız için çevirileri ekleyin",
        countryCode: "Dil",
        translation: "aşlık çevirisi açık ",
      },
      image: {
        title: "Fotoğrafçılık",
        subtitle: "Menü ve web sitesi için fotoğraf yükle",
        change: "Fotoğrafı değiştir",
        upload: "Fotoğraf yükle",
        remove: "Fotoğrafı kaldır",
      },
      description: {
        title: "Açıklaması",
        subtitle: "Müşteri için öğe hakkında açıklama",
        d: "Açıklama",
      },
      instruction: {
        title: "Talimat",
        subtitle: "Öğe için talimat",
        i: "Talimat",
      },
    },
  },
  kitchen: {
    tableNo: "Tablo №",
    done: "Bitti",
    restart: "Yeniden başlat",
    filterTitle: "Öğelere ilişkin filtreler",
    filterByStat: "Duruma göre",
    filterByCat: "Kategoriye göre",
    statuses: {
      ALL: "Tüm durumlar",
      WAITING: "Yemek pişirme",
      DONE: "Bitti",
    },
    allCategories: "Tüm kategoriler",
  },
  dayStats: {
    noItem: "Bu gün için öğe yok",
  },
  periodStats: {
    noItem: "Bu dönem için öğe yok",
    ordersCount: "Sipariş sayısı",
    total: "Toplam",
    totalByPaymentMethods: "Ödeme yöntemlerine göre toplam",
  },
  users: {
    list: {
      title: "Kullanıcı listesi",
      update: "Kullanıcı listesini güncelle",
      search: "Kullanıcıları ara",
      empty: "Henüz kullanıcınız yok",
      login: "Giriş",
    },
    form: {
      new: "Yeni kullanıcı",
      edit: "Kullanıcıyı düzenle",
      remove: "Kullanıcıyı kaldır",
      permission: "İzin türü",
      admin: "Yöneticiler",
      kitchen: "Mutfak çalışanları",
      manager: "Yöneticiler",
      personal: "Kişisel ve garsonlar",
      name: "Ad",
      login: "Login",
      password: "Şifre",
      password2: "Şifreyi tekrarla",
      nameReq: "İsim gerekli",
      loginReq: "Giriş yapılması gerekli",
      loginMust: "Giriş yalnızca sayı ve harflerden oluşmalıdır",
      passwordReq: "Yeni şifre gerekli",
      passwordMust: "Yeni şifre 4 sembolden oluşmalıdır",
      passwordRepeat: "Şifreyi tekrarla",
      passwordSame: "Şifre aynı değil",
      error: "Kaydederken hata oluştu",
    },
  },
  methods: {
    list: {
      title: "Ödeme yöntemleri",
      update: "Ödeme yöntemlerini güncelle",
      search: "Yöntem aranıyor",
      empty: "Henüz herhangi bir yönteminiz yok",
    },
    form: {
      new: "Yeni yöntem",
      edit: "Yöntemi düzenle",
      remove: "Yöntemi kaldır",
      title: "Başlık",
      description: "Açıklama",
      titleReq: "Başlık gerekli",
      descriptionReq: "Açıklama gerekli",
      error: "Kaydederken hata oluştu",
    },
  },
  map: {
    list: {
      update: "Haritayı güncelle",
    },
    form: {
      new: "Yeni öğe",
      edit: "Öğeyi düzenle",
      name: "Öğe başlığı",
      nameReq: "Başlık gerekli",
      number: "Sayı",
      numberReq: "Numara gerekli",
      error: "Kaydederken hata oluştu",
      delete: "Öğeyi sil",
      type: "Öğe türü",
      x: "Yatay öğe",
      y: "Dikey öğe",
      w: "Genişlik",
      h: "Yükseklik",
      size: "Boyut",
      is_wall: "Simge değil",
      for_order: "Sipariş için",
    },
  },
  company: {
    title: "Şirket unvanı",
    tin: "TIN numarası",
    loginPrefix: "Giriş öneki",
    email: "E-posta",
    currencySymbol: "Para birimi simgesi",
    defaultLanguage: "Varsayılan dil",
    emailReq: "E-posta gerekli",
    emailInv: "E-posta geçersiz",
    titleReq: "Başlık gerekli",
    tinReq: "TIN gerekli",
    loginPrefixReq: "Giriş öneki gerekli",
    currencySymbolReq: "Para birimi simgesi gerekli",
    defaultLanguageReq: "Varsayılan dil gerekli",
    translation: {
      select: "Ek diller",
      add: "Dil ekle",
    },
  },
};

export default i18nEn;