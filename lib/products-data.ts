import { Product, Review } from '@/lib/types'

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Nguyễn Thị Mai',
    rating: 5,
    comment: 'Sản phẩm rất ngon, vị ngọt tự nhiên. Đóng gói đẹp, giao hàng nhanh. Sẽ mua lại!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Trần Văn Hùng',
    rating: 4,
    comment: 'Chất lượng tốt, giá hợp lý. Gia đình mình rất thích.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 'r3',
    userId: 'u3',
    userName: 'Lê Thị Hoa',
    rating: 5,
    comment: 'Mua làm quà tặng, người nhận rất hài lòng. Bao bì sang trọng.',
    date: '2024-01-05',
    verified: true,
  },
  {
    id: 'r4',
    userId: 'u4',
    userName: 'Phạm Minh Tuấn',
    rating: 4,
    comment: 'Sấy dẻo vừa phải, không quá khô. Vị thơm ngon.',
    date: '2023-12-28',
    verified: false,
  },
]

export const PRODUCTS_DATA: Product[] = [
  {
    id: '1',
    name: 'Xoài sấy dẻo premium',
    description: 'Xoài sấy dẻo premium được sản xuất từ những trái xoài chín tự nhiên.',
    longDescription: 'Xoài sấy dẻo premium được sản xuất từ những trái xoài chín tự nhiên, được tuyển chọn kỹ lưỡng từ vùng trồng nổi tiếng. Sản phẩm được sấy theo công nghệ hiện đại, giữ lại tối đa hương vị và chất dinh dưỡng. Không chất bảo quản, không phẩm màu, an toàn cho sức khỏe. Phù hợp làm quà tặng hoặc ăn vặt hàng ngày.',
    image: '/products/xoai-say-deo.png',
    images: [
      '/products/xoai-say-deo.png',
    ],
    price: 89000,
    originalPrice: 119000,
    fruitType: 'Xoài',
    processingMethod: 'Sấy dẻo',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.8,
    reviews: sampleReviews.slice(0, 3),
    stock: 45,
    specifications: {
      origin: 'Việt Nam - Đồng Tháp',
      shelf_life: '12 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Xoài tự nhiên',
    },
    relatedProducts: ['5', '8'],
  },
  {
    id: '2',
    name: 'Dứa sấy thăng hoa tinh khiết',
    description: 'Dứa sấy thăng hoa giữ lại toàn bộ chất dinh dưỡng và hương vị tự nhiên.',
    longDescription: 'Dứa sấy thăng hoa được sản xuất bằng công nghệ sấy thăng hoa tiên tiến nhất, giúp giữ lại tối đa 95% chất dinh dưỡng so với dứa tươi. Sản phẩm có độ giòn tan đặc trưng, vị ngọt thanh tự nhiên, không đường, không chất bảo quản. Lý tưởng cho người ăn kiêng và yêu sức khỏe.',
    image: '/products/dua-say.png',
    images: [
      '/products/dua-say.png',
    ],
    price: 129000,
    originalPrice: 159000,
    fruitType: 'Dứa',
    processingMethod: 'Sấy thăng hoa',
    weight: '50g',
    label: 'Xuất khẩu',
    rating: 4.9,
    reviews: sampleReviews,
    stock: 32,
    specifications: {
      origin: 'Việt Nam - Tiền Giang',
      shelf_life: '18 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, tránh ánh nắng',
      ingredients: '100% Dứa tự nhiên',
    },
    relatedProducts: ['6', '10'],
  },
  {
    id: '3',
    name: 'Mít sấy dẻo vàng ươm',
    description: 'Mít sấy dẻo với vị ngọt tự nhiên, mềm mại, dễ nhai.',
    longDescription: 'Mít sấy dẻo vàng ươm được làm từ những trái mít chín mọng, ngọt tự nhiên từ miền Tây Nam Bộ. Quy trình sấy dẻo đặc biệt giúp giữ nguyên hương thơm đặc trưng và độ dẻo mềm vừa phải. Sản phẩm không chứa đường thêm, phù hợp cho cả trẻ em và người lớn.',
    image: '/products/mit-say.png',
    images: [
      '/products/mit-say.png',
    ],
    price: 149000,
    originalPrice: 199000,
    fruitType: 'Mít',
    processingMethod: 'Sấy dẻo',
    weight: '200g',
    label: 'Nội địa',
    rating: 4.7,
    reviews: sampleReviews.slice(0, 2),
    stock: 28,
    specifications: {
      origin: 'Việt Nam - Bến Tre',
      shelf_life: '10 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Mít Việt Nam',
    },
    relatedProducts: ['7', '11'],
  },
  {
    id: '4',
    name: 'Thanh long sấy thăng hoa hồng',
    description: 'Thanh long sấy thăng hoa màu hồng xinh đẹp, giữ nguyên giá trị dinh dưỡng.',
    longDescription: 'Thanh long ruột đỏ sấy thăng hoa với màu sắc bắt mắt và hương vị đặc trưng. Công nghệ sấy thăng hoa giúp giữ nguyên màu sắc tự nhiên và 95% dưỡng chất. Sản phẩm giàu vitamin C, chất chống oxy hóa, tốt cho làn da và hệ miễn dịch.',
    image: '/products/thanh-long-say.png',
    images: [
      '/products/thanh-long-say.png',
    ],
    price: 159000,
    originalPrice: undefined,
    fruitType: 'Thanh Long',
    processingMethod: 'Sấy thăng hoa',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.6,
    reviews: sampleReviews.slice(1, 4),
    stock: 52,
    specifications: {
      origin: 'Việt Nam - Bình Thuận',
      shelf_life: '15 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, mát',
      ingredients: '100% Thanh long Việt Nam',
    },
    relatedProducts: ['9', '12'],
  },
  {
    id: '5',
    name: 'Xoài cát Hòa Lộc sấy dẻo',
    description: 'Xoài cát Hòa Lộc sấy dẻo, vị ngọt đậm đà, thơm lừng.',
    longDescription: 'Xoài cát Hòa Lộc - giống xoài ngon nhất Việt Nam được sấy dẻo theo công nghệ đặc biệt. Vị ngọt đậm đà, thơm lừng đặc trưng của xoài Hòa Lộc được giữ nguyên. Sản phẩm phù hợp làm quà biếu cao cấp hoặc thưởng thức hàng ngày.',
    image: '/products/xoai-say-deo.png',
    images: [
      '/products/xoai-say-deo.png',
    ],
    price: 109000,
    originalPrice: 149000,
    fruitType: 'Xoài',
    processingMethod: 'Sấy dẻo',
    weight: '200g',
    label: 'Nội địa',
    rating: 4.7,
    reviews: sampleReviews.slice(0, 3),
    stock: 38,
    specifications: {
      origin: 'Việt Nam - Tiền Giang',
      shelf_life: '12 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Xoài cát Hòa Lộc',
    },
    relatedProducts: ['1', '8'],
  },
  {
    id: '6',
    name: 'Dứa vàng sấy dẻo tự nhiên',
    description: 'Dứa vàng sấy dẻo, giữ lại vị ngọt tự nhiên và hương thơm đặc trưng.',
    longDescription: 'Dứa vàng được tuyển chọn kỹ lưỡng và sấy dẻo theo quy trình đặc biệt. Sản phẩm giữ nguyên vị ngọt thanh tự nhiên và hương thơm đặc trưng của dứa tươi. Chứa enzyme bromelain tốt cho tiêu hóa, vitamin C và các khoáng chất thiết yếu.',
    image: '/products/dua-say.png',
    images: [
      '/products/dua-say.png',
    ],
    price: 99000,
    originalPrice: 129000,
    fruitType: 'Dứa',
    processingMethod: 'Sấy dẻo',
    weight: '100g',
    label: 'Nội địa',
    rating: 4.5,
    reviews: sampleReviews.slice(0, 2),
    stock: 55,
    specifications: {
      origin: 'Việt Nam - Kiên Giang',
      shelf_life: '12 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Dứa Việt Nam',
    },
    relatedProducts: ['2', '10'],
  },
  {
    id: '7',
    name: 'Mít tím sấy thăng hoa nguyên chất',
    description: 'Mít tím sấy thăng hoa, hạn chế giảm chất dinh dưỡng, vị ngon đặc biệt.',
    longDescription: 'Mít tím - giống mít cao cấp được sấy thăng hoa để giữ nguyên màu sắc và dưỡng chất. Sản phẩm có độ giòn tan đặc trưng, vị ngọt thanh và hương thơm quyến rũ. Giàu vitamin B6, kali và chất xơ, tốt cho sức khỏe tim mạch.',
    image: '/products/mit-say.png',
    images: [
      '/products/mit-say.png',
    ],
    price: 189000,
    originalPrice: 249000,
    fruitType: 'Mít',
    processingMethod: 'Sấy thăng hoa',
    weight: '50g',
    label: 'Xuất khẩu',
    rating: 4.9,
    reviews: sampleReviews,
    stock: 18,
    specifications: {
      origin: 'Việt Nam - Bến Tre',
      shelf_life: '18 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, tránh ẩm',
      ingredients: '100% Mít tím cao cấp',
    },
    relatedProducts: ['3', '11'],
  },
  {
    id: '8',
    name: 'Xoài sấy thăng hoa siêu dinh dưỡng',
    description: 'Xoài sấy thăng hoa, giữ tối đa chất dinh dưỡng, hương vị đặc biệt.',
    longDescription: 'Xoài sấy thăng hoa cao cấp với công nghệ tiên tiến nhất, giữ lại 95% dưỡng chất và hương vị tự nhiên. Sản phẩm có độ giòn tan hoàn hảo, vị ngọt thanh và màu vàng tự nhiên bắt mắt. Lý tưởng cho người yêu sức khỏe và làm quà tặng sang trọng.',
    image: '/products/xoai-say-deo.png',
    images: [
      '/products/xoai-say-deo.png',
    ],
    price: 199000,
    originalPrice: 269000,
    fruitType: 'Xoài',
    processingMethod: 'Sấy thăng hoa',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.8,
    reviews: sampleReviews.slice(0, 3),
    stock: 25,
    specifications: {
      origin: 'Việt Nam - Đồng Tháp',
      shelf_life: '18 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, tránh ẩm',
      ingredients: '100% Xoài cao cấp',
    },
    relatedProducts: ['1', '5'],
  },
  {
    id: '9',
    name: 'Thanh long sấy dẻo mix hương vị',
    description: 'Thanh long sấy dẻo mix hương vị đỏ trắng, vừa có vị ngọt vừa mát lạnh.',
    longDescription: 'Thanh long sấy dẻo mix gồm cả ruột đỏ và ruột trắng, tạo nên hương vị độc đáo. Sản phẩm có độ dẻo mềm vừa phải, vị ngọt thanh mát và màu sắc bắt mắt. Giàu vitamin C, chất xơ và chất chống oxy hóa, tốt cho sức khỏe và làn da.',
    image: '/products/thanh-long-say.png',
    images: [
      '/products/thanh-long-say.png',
    ],
    price: 119000,
    originalPrice: undefined,
    fruitType: 'Thanh Long',
    processingMethod: 'Sấy dẻo',
    weight: '200g',
    label: 'Nội địa',
    rating: 4.6,
    reviews: sampleReviews.slice(1, 3),
    stock: 41,
    specifications: {
      origin: 'Việt Nam - Long An',
      shelf_life: '12 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Thanh long Việt Nam',
    },
    relatedProducts: ['4', '12'],
  },
  {
    id: '10',
    name: 'Dứa sấy dẻo túi tiết kiệm',
    description: 'Dứa sấy dẻo gói tiết kiệm 500g, phù hợp cho gia đình hoặc bán sỉ.',
    longDescription: 'Dứa sấy dẻo gói lớn 500g với giá ưu đãi, phù hợp cho gia đình đông người hoặc kinh doanh. Sản phẩm chất lượng cao, vị ngọt thanh tự nhiên, không chất bảo quản. Đóng gói kín, tiện lợi bảo quản và sử dụng.',
    image: '/products/dua-say.png',
    images: [
      '/products/dua-say.png',
    ],
    price: 249000,
    originalPrice: 349000,
    fruitType: 'Dứa',
    processingMethod: 'Sấy dẻo',
    weight: '500g',
    label: 'Nội địa',
    rating: 4.7,
    reviews: sampleReviews,
    stock: 65,
    specifications: {
      origin: 'Việt Nam - Kiên Giang',
      shelf_life: '12 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Dứa Việt Nam',
    },
    relatedProducts: ['2', '6'],
  },
  {
    id: '11',
    name: 'Mít vàng sấy dẻo đặc sản',
    description: 'Mít vàng sấy dẻo đặc sản, chuẩn xuất khẩu, hương vị cao cấp.',
    longDescription: 'Mít vàng sấy dẻo đặc sản từ giống mít nghệ cao cấp, được tuyển chọn kỹ lưỡng. Sản phẩm đạt tiêu chuẩn xuất khẩu với hương vị đậm đà, màu vàng tươi bắt mắt. Độ dẻo mềm hoàn hảo, thơm ngon từng miếng.',
    image: '/products/mit-say.png',
    images: [
      '/products/mit-say.png',
    ],
    price: 169000,
    originalPrice: undefined,
    fruitType: 'Mít',
    processingMethod: 'Sấy dẻo',
    weight: '100g',
    label: 'Xuất khẩu',
    rating: 4.8,
    reviews: sampleReviews.slice(0, 3),
    stock: 33,
    specifications: {
      origin: 'Việt Nam - Bến Tre',
      shelf_life: '12 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, thoáng mát',
      ingredients: '100% Mít vàng cao cấp',
    },
    relatedProducts: ['3', '7'],
  },
  {
    id: '12',
    name: 'Thanh long hỗn hợp sấy thăng hoa',
    description: 'Thanh long hỗn hợp sấy thăng hoa, chuẩn xuất khẩu, vị chuẩn mực.',
    longDescription: 'Thanh long hỗn hợp (đỏ và trắng) sấy thăng hoa chuẩn xuất khẩu. Sản phẩm giữ nguyên màu sắc tự nhiên rực rỡ và 95% dưỡng chất. Độ giòn tan hoàn hảo, vị ngọt thanh tự nhiên, không đường thêm.',
    image: '/products/thanh-long-say.png',
    images: [
      '/products/thanh-long-say.png',
    ],
    price: 179000,
    originalPrice: 229000,
    fruitType: 'Thanh Long',
    processingMethod: 'Sấy thăng hoa',
    weight: '200g',
    label: 'Xuất khẩu',
    rating: 4.9,
    reviews: sampleReviews,
    stock: 29,
    specifications: {
      origin: 'Việt Nam - Bình Thuận',
      shelf_life: '18 tháng từ ngày sản xuất',
      storage: 'Bảo quản nơi khô ráo, tránh ẩm',
      ingredients: '100% Thanh long Việt Nam',
    },
    relatedProducts: ['4', '9'],
  },
]

// Flash sale products (product IDs that are on flash sale)
export const FLASH_SALE_PRODUCTS = ['1', '3', '7', '10']

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS_DATA.find(p => p.id === id)
}

// Helper function to get related products
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId)
  if (!product) return []
  
  // Get related by same fruit type
  const relatedByType = PRODUCTS_DATA
    .filter(p => p.id !== productId && p.fruitType === product.fruitType)
    .slice(0, limit)
  
  // If not enough, add products from relatedProducts array
  if (relatedByType.length < limit && product.relatedProducts) {
    const additionalIds = product.relatedProducts.filter(
      id => !relatedByType.find(p => p.id === id)
    )
    const additionalProducts = additionalIds
      .map(id => getProductById(id))
      .filter((p): p is Product => p !== undefined)
    
    return [...relatedByType, ...additionalProducts].slice(0, limit)
  }
  
  return relatedByType
}

// Check if product is on flash sale
export function isFlashSale(productId: string): boolean {
  return FLASH_SALE_PRODUCTS.includes(productId)
}
