import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const vnTranslation = {
	updateUser: 'Cập nhật tài khoản',
	familyAdminPanel: 'Quản trị viên',
	searchPlaceHolder: 'Tìm kiếm sản phẩm...',

	pagesTitle: {
		landing: 'Family Store - Mua sắm online dễ dàng hơn',
		search: 'Family Store - Kết quả tìm kiếm',
		login: 'Family Store - Đăng nhập',
		register: 'Family Store - Đăng ký',
		verify: 'Family Store - Kích hoạt tài khoản',
		forgot: 'Family Store - Quên mật khẩu',
		recovery: 'Family Store - Khôi mục mật khẩu',
		collection: 'Family Store - Xem theo danh mục',
		profile: 'Family Store - Trang cá nhân của tôi',
		orders: 'Family Store - Các đơn hàng của tôi',
		reviews: 'Family Store - Đánh giá đơn hàng',
		checkout: 'Family Store - Thanh toán',
		checkoutSuccess: 'Family Store - Thanh toán thành công',

		admin: {
			landing: 'Family Store - Quản trị viên',
			user: 'Family Store - Quản lý người dùng',
			category: 'Family Store - Quản lý danh mục',
			subCategory: 'Family Store - Quản lý danh mục con',
			product: 'Family Store - Quản lý sản phẩm'
		}
	},

	deleteModal: {
		message: 'Bạn có chắc chắn xóa?',
		user: 'Xóa người dùng',
		category: 'Xóa danh mục',
		subCategory: 'Xóa danh mục con',
		product: 'Xóa sản phẩm'
	},

	generalButtons: {
		cancel: 'Hủy',
		add: 'Thêm mới',
		update: 'Cập nhật',
		delete: 'Xóa',
		save: 'Lưu thay đổi',
		back: 'Quay lại',
		confirm: 'Xác nhận',
		login: 'Đăng nhập',
		register: 'Đăng ký',
		accept: 'Chấp nhận',
		active: 'Kích hoạt',
		forgot: 'Nhận email khôi phục',
		logout: 'Đăng xuất',
		myAccount: 'Tài khoản',
		myOrders: 'Xem các đơn hàng',
		myCart: 'Xem giỏ hàng',
		seeDetails: 'Xem chi tiết',
		review: 'Nhận xét',
		refresh: 'LÀM MỚI',
		addToCart: 'THÊM VÀO GIỎ',
		checkout: 'TIẾN HÀNH THANH TOÁN',
		updateImage: 'CẬP NHẬT CÁC ẢNH',
		newAddress: 'Địa chỉ mới',
		savedAddress: 'Địa chỉ đã lưu',
		saveAddress: 'Lưu lại địa chỉ này',
		backToMainPage: 'Tiếp tục mua sắm',
		viewMore: 'XEM THÊM',
		viewMoreProducts: 'SẢN PHẨM',
		receivedProduct: 'Tôi đã nhận được hàng'
	},

	footer: {
		copyright: '© 2021 - Bản quyền thuộc về Family market. ',
		contact: ' Liên lạc với chúng tôi tại '
	},

	generalTable: {
		options: 'Tùy chọn',
		unknown: 'Không rõ',
		lastModified: 'Lần sửa đổi cuối',
		emptyData: 'Không có dữ liệu',
		wrong: 'Đã có sự cố xảy ra!',
		rowsPerPage: 'Số dòng mỗi trang: '
	},

	homepage: {
		bannerTitle: 'Mua sắm ngay tại nhà',
		bannerDescription:
			'Vì sức khỏe cộng đồng "Kết nối không khoảng cách". An tâm mua sắm tại nhà cùng Family Store',
		topTitle1: 'Bán chạy nhất tuần',
		topTitle2: 'Bán chạy nhất tháng',
		topTitle3: 'Sản phẩm giá tốt'
	},

	loginpage: {
		title: 'Family Store - Đăng Nhập',
		formTitle: 'Đăng Nhập',
		email: 'Email',
		emailInValid: 'Địa chỉ email không hợp lệ',
		password: 'Mật khẩu',
		passwordInValid: 'Mật khẩu không hợp lệ',
		newMember: 'Chưa có tài khoản?',
		forgotPassword: 'Quên mật khẩu?',
		signUp: 'Đăng kí'
	},

	registerpage: {
		title: 'Family Store - Đăng Ký',
		formTitle: 'Đăng Ký',
		email: 'Email',
		emailInValid: 'Địa chỉ email không hợp lệ',
		address: 'Địa chỉ',
		fullName: 'Họ và tên',
		fullNameInValid: 'Tên người dùng không hợp lệ.',
		addressInValid: 'Địa chỉ không hợp lệ.',
		password: 'Mật khẩu',
		passwordInValid: 'Mật khẩu không hợp lệ',
		confirmPassword: 'Nhập lại mật khẩu',
		confirmPasswordInValid: 'Mật khẩu và xác nhận mật khẩu không trùng nhau',
		phonenumberInValid: 'Số điện thoại không hợp lệ',
		haveAccount: 'Bạn đã có tài khoản ?',
		signIn: 'Đăng nhập'
	},

	searchPage: {
		title: 'Family Store - Kết quả tìm kiếm',
		topContent: 'Kết quả tìm kiếm cho',
		emptyMessage: 'Không có kết quả nào cho từ khóa này, hãy thử từ khóa khác',
		sortBy: {
			title: 'Sắp xếp theo',
			name: 'Tên sản phẩm',
			quantity: 'Số lượng',
			createdDate: 'Ngày tạo',
			price: 'Giá'
		},
		sortType: {
			title: 'Kiểu sắp',
			asc: 'Tăng dần',
			desc: 'Giảm dần'
		}
	},

	forgotpasswordpage: {
		title: 'Family Store - Quên mật khẩu',
		formTitle: 'Quên mật khẩu',
		email: 'Email',
		emailInValid: 'Địa chỉ email không hợp lệ',
		newMember: 'Chưa có tài khoản?',
		haveAccount: 'Quay lại trang đăng nhập',
		signUp: 'Đăng kí',
		pleaseCheckEmail: 'Vui lòng kiểm tra email để reset password!. Chuyển sang trang đổi mật khẩu sau: '
	},

	recoverypasswordpage: {
		title: 'Family Store - Khôi phục tài khoản',
		formTitle: 'Khôi phục tài khoản',
		password: 'Mật khẩu',
		passwordInValid: 'Mật khẩu không hợp lệ',
		confirmPassword: 'Nhập lại mật khẩu',
		confirmPasswordInValid: 'Mật khẩu và xác nhận mật khẩu không trùng nhau',
		resetPasswordSucceed: 'Đổi mật thành công! Chuyển sang trang đăng nhập sau:',
		checkEmail: 'Lấy code từ email'
	},

	accountactivationpage: {
		title: 'Family Store - Kích hoạt tài khoản',
		formTitle: 'Kích hoạt tài khoản',
		code: 'Mã kích hoạt',
		codeInvalid: 'Mã không hợp lệ',
		haveAccount: 'Quay lại trang đăng nhập'
	},

	profilepage: {
		title: 'Tài khoản của tôi',
		changePassword: 'Đổi mật khẩu',
		cancel: 'Hủy bỏ',
		selectNewAvatar: 'Chọn hình ảnh mới',
		removeChange: 'X Hủy bỏ thay đổi',
		updateProfilePicture: 'Cập nhật ảnh',
		tabTitle: {
			1: 'CƠ BẢN',
			2: 'ĐỔI MẬT KHẨU',
			3: 'ẢNH ĐẠI DIỆN'
		},
		fullName: 'Họ và tên',
		email: 'Email',
		address: 'Địa chỉ',
		currentPassword: 'Mật khẩu hiện tại của bạn',
		newPassword: 'Mật khẩu mới',
		confirmNewPassword: 'Nhập lại mật khẩu mới',
		buttonRemove: 'Xóa',
		buttonBrowse: 'Chọn',
		buttonExecute: 'Lưu thay đổi'
	},

	productDetailPage: {
		productDescription: 'THÔNG TIN SẢN PHẨM',
		productReview: 'NHẬN XÉT SẢN PHẨM',
		suggestions: 'SẢN PHẨM GỢI Ý',
		showLess: 'Thu gọn',
		showMore: 'Đầy đủ',
		estimatedDeliveryFee: 'Phí giao hàng dự kiến:',
		districtOrWard: 'Quận / Huyện:',
		addToCart: 'Thêm vào giỏ hàng',
		suggestion: 'BẠN CŨNG CÓ THỂ THÍCH'
	},

	cartModal: {
		cart: 'Giỏ hàng',
		total: 'Tổng tiền',
		checkout: 'TIẾN HÀNH THANH TOÁN',
		unitPrice: 'Giá bán lẻ',
		salePrice: 'Giá khuyến mãi'
	},

	sideBar: {
		categories: 'Danh mục sản phẩm'
	},

	adminPage: {
		sideBar: {
			positionName: 'QUẢN LÝ',
			idName: '[Mã tài khoản]: ',
			dashboardName: 'Bảng điều khiển',
			product: {
				name: 'Quản lý sản phẩm',
				category: 'Danh mục',
				subCategory: 'Danh mục con',
				product: 'Tất cả sản phẩm'
			},
			user: 'Tất cả người dùng'
		},

		landing: {
			title: 'KHU VỰC QUẢN LÝ',
			category: 'TỔNG SỐ DANH MỤC: ',
			product: 'TỔNG SỐ SẢN PHẨM: ',
			order: 'TỔNG SỐ ĐƠN HÀNG ĐÃ TẠO: ',
			subCategory: 'TỔNG SỐ DANH MỤC CON: ',
			customer: 'SỐ LƯỢNG KHÁCH HÀNG: ',
			staff: 'SỐ LƯỢNG NHÂN VIÊN: ',
			orderStatistics: 'THỐNG KÊ ĐƠN HÀNG'
		},

		user: {
			title: 'QUẢN LÝ NGƯỜI DÙNG',
			searchPlaceHolder: 'Tìm kiếm người dùng',
			table: {
				id: 'Mã',
				fullName: 'Tên đầy đủ',
				email: 'Email',
				phoneNumber: 'Số điện thoại',
				role: 'Quyền hạn',
				status: 'Trạng thái'
			},
			addingModal: {
				title: 'THÊM NGƯỜI DÙNG MỚI'
			}
		},

		category: {
			title: 'QUẢN LÝ DANH MỤC',
			searchPlaceHolder: 'Tìm kiếm danh mục',
			table: {
				categoryId: 'Mã danh mục',
				categoryName: 'Tên danh mục',
				subCategoryCount: 'Số danh mục con'
			},
			modal: {
				addingTitle: 'THÊM DANH MỤC MỚI',
				updateTitle: 'CẬP NHẬT DANH MỤC'
			}
		},

		subCategory: {
			title: 'QUẢN LÝ DANH MỤC CON',
			searchPlaceHolder: 'Tìm kiếm danh mục con',
			fatherCatetory: 'Tên danh mục cha ',
			table: {
				subCategoryId: 'Mã danh mục con',
				subCategoryName: 'Tên danh mục con'
			},
			modal: {
				addtingTitle: 'THÊM DANH MỤC CON',
				updateTitle: 'CẬP NHẬT DANH MỤC CON'
			}
		},

		product: {
			title: 'QUẢN LÝ SẢN PHẨM',
			searchPlaceHolder: 'Tìm kiếm tên sản phẩm',
			table: {
				productId: 'ID',
				productName: 'Tên sản phẩm',
				image: 'Ảnh',
				category: 'Danh mục con',
				quantity: 'Số lượng',
				price: 'Giá (VNĐ)',
				description: 'Mô tả chi tiết'
			},
			modal: {
				addingTitle: 'THÊM SẢN PHẨM MỚI',
				updateTitle: 'CẬP NHẬT SẢN PHẨM'
			}
		}
	},

	ordersPage: {
		all: 'TOÀN BỘ ĐƠN HÀNG',
		await: 'ĐANG CHỜ XÁC NHẬN',
		delivering: 'ĐANG VẬN CHUYỂN',
		delivered: 'ĐÃ GIAO',
		canceled: 'ĐÃ HỦY',
		item: {
			orderId: 'MÃ ĐƠN HÀNG: ',
			createdDate: 'Ngày tạo đơn: ',
			deliveryDate: 'Ngày giao dự kiến: ',
			status: 'TRẠNG THÁI: ',
			totalPayment: 'Tổng phải trả: '
		},
		details: {
			titleTop: 'TỔNG QUAN ĐƠN HÀNG',
			titleMid: 'CÁC SẢN PHẨM ĐÃ MUA',
			placeHolder: 'Bạn nghĩ gì về sản phẩm này?'
		}
	},

	checkoutPage: {
		address: {
			title: '1. Địa chỉ nhận hàng',
			form: {
				titleTop: 'Thông tin người nhận hàng',
				titleMid: 'Loại địa chỉ',
				namePlaceHolder: 'Họ và tên',
				phoneNumberPlaceHolder: 'Sô điện thoại',
				cityPlaceHolder: 'tên tỉnh thành',
				districtPlaceHolder: 'Tên Quận/huyện',
				wardPlaceHolder: 'Tên Phường/Xã',
				streetPlaceHolder: 'Số địa chỉ nhà, tên đường'
			}
		},
		others: {
			title: '2. Thời gian giao hàng dự kiến: ',
			form: {
				note: 'Ghi chú thêm (Nếu có)',
				price: 'Tiền mua hàng',
				deliveryPrice: 'Phí giao hàng',
				totalPayment: 'Tổng phải trả',
				deliveryMethod: '(THANH TOÁN KHI NHẬN HÀNG)'
			}
		},
		success: {
			thanks: 'CẢM ƠN BẠN!',
			title: 'Đơn Hàng Của Bạn Đã Được Xử Lý!',
			message: 'Bạn sẽ nhận được Email về chi tiết đơn hàng.'
		}
	},

	toastMessages: {
		common: {
			error: 'Đã có lỗi xảy ra!',
			success: 'Thành công!'
		},
		admin: {
			user: {
				addSuccess: 'Thêm người dùng thành công!',
				updateSuccess: 'Cập nhật người dùng thành công!',
				deleteSuccess: 'Xóa người dùng thành công!',
				updateRoleSuccess: 'Cập nhật quyền thành công cho người dùng có id: ',
				updateRoleFail: 'Cập nhật quyền thất bại cho người dùng có id: ',
				updateStatusSuccess: 'Cập nhật trạng thái thành công cho người dùng có id: ',
				updateStatusFail: 'Cập nhật trạng thái thái bại cho người dùng có id: '
			},
			category: {
				deleteSuccess: 'Xóa danh mục thành công!',
				addSuccess: 'Thêm danh mục mới thành công!',
				updateSuccess: 'Cập nhật danh mục thành công!'
			},
			subCategory: {
				deleteSuccess: 'Xóa danh mục con thành công!',
				addSuccess: 'Thêm danh mục con mới thành công!',
				updateSuccess: 'Cập nhật danh mục con thành công!'
			},
			product: {
				deleteSuccess: 'Xóa sản phẩm thành công!',
				addSuccess: 'Thêm sản phẩm mới thành công!',
				updateSuccess: 'Cập nhật thông tin sản phẩm thành công!',
				updateImageSuccess: 'Cập nhật ảnh cho sản phẩm thành công!'
			}
		},
		user: {
			review: {
				success: 'Đã đánh giá sản phẩm thành công!'
			}
		}
	},

	collectionPage: {
		empty: 'Hiện không có sản phẩm nào ở danh mục này'
	}
};

const enTranslation = {
	searchPlaceHolder: 'What are you looking for?',
	updateUser: 'Update User',
	familyAdminPanel: 'Family Admin Panel',
	addNew: 'Add New',

	pagesTitle: {
		landing: 'Family Store - Buy online Easier',
		search: 'Family Store - Search results',
		login: 'Family Store - Login',
		register: 'Family Store - Register',
		verify: 'Family Store - Activate account',
		forgot: 'Family Store - Forgot password',
		recovery: 'Family Store - Recovery',
		collection: 'Family Store - Collections',
		profile: 'Family Store - My profile',
		orders: 'Family Store - My orders',
		reviews: 'Family Store - Review this order',
		checkout: 'Family Store - Payment',
		checkoutSuccess: 'Family Store - Payment successfully',

		admin: {
			landing: 'Family Store - Administrator',
			user: 'Family Store - Manage users',
			category: 'Family Store - Manage Categories',
			subCategory: 'Family Store - Manage Sub categories',
			product: 'Family Store - Manage products'
		}
	},

	deleteModal: {
		message: 'Are you sure to delete this item?',
		user: 'Delete A User',
		category: 'Delete A Category',
		subCategory: 'Delete A Sub Category',
		product: 'Delete A Product'
	},

	generalButtons: {
		cancel: 'Cancel',
		add: 'Add New',
		update: 'Update',
		delete: 'Delete',
		save: 'Save Changes',
		back: 'Back',
		confirm: 'Confirm',
		login: 'Login',
		register: 'Register',
		accept: 'Accept',
		active: 'Active',
		forgot: 'Recive recovery Email',
		logout: 'Log out',
		myAccount: 'My account',
		myOrders: 'View my orders',
		myCart: 'My Cart',
		seeDetails: 'See details',
		review: 'Review',
		refresh: 'REFRESH',
		addToCart: 'ADD TO CART',
		checkout: 'PROCESS TO CHECKOUT',
		updateImage: 'UPDATE IMAGES',
		newAddress: 'New address',
		savedAddress: 'Saved address',
		saveAddress: 'Save this address',
		backToMainPage: 'Continue to shopping',
		viewMore: 'VIEW MORE ',
		viewMoreProducts: ' PRODUCTS',
		receivedProduct: 'I have received this order'
	},

	generalTable: {
		options: 'Options',
		unknown: 'Unknown',
		lastModified: 'Last Modified',
		emptyData: 'No available data',
		wrong: 'Something went wrong!',
		rowsPerPage: 'Rows per page: '
	},

	footer: {
		copyright: 'Copyright 2021 © Family market. ',
		contact: ' Contact us at '
	},

	homepage: {
		bannerTitle: 'Stay home & delivered your daily need’s',
		bannerDescription: 'Start your daily shopping with Family Store',
		topTitle1: 'Top items selling last week',
		topTitle2: 'Top items selling last month',
		topTitle3: 'Items on sale'
	},

	loginpage: {
		title: 'Family Store - Login',
		formTitle: 'Login',
		email: 'Email',
		emailInValid: 'Please enter a valid email.',
		password: 'Password',
		passwordInValid: 'Please enter a valid password.',
		newMember: 'New member?',
		forgotPassword: 'Forgot passsword?',
		signUp: 'Sign up'
	},

	registerpage: {
		title: 'Family Store - Sign up',
		formTitle: 'Sign up',
		email: 'Email',
		emailInValid: 'Please enter a valid email',
		address: 'Address',
		addressInValid: 'Please enter a valid address',
		fullName: 'FullName',
		fullNameInValid: 'Please enter a valid name',
		password: 'Password',
		passwordInValid: 'Please enter a valid password',
		confirmPassword: 'Confirm Password',
		confirmPasswordInValid: 'Password and confirm password does not match',
		phonenumberInValid: 'Please enter a valid phone number',
		haveAccount: 'Already have account ?',
		signIn: 'Login'
	},

	forgotpasswordpage: {
		title: 'Family Store - Forgot password',
		formTitle: 'Forgot password',
		email: 'Email',
		emailInValid: 'Please enter a valid email',
		newMember: 'New member?',
		haveAccount: 'Back to login',
		signUp: 'Sign up',
		pleaseCheckEmail: 'Email has been sent!. Forward to  reset password page after: '
	},

	recoverypasswordpage: {
		title: 'Family Store - Restore account',
		formTitle: 'Restore account',
		password: 'New password',
		passwordInValid: 'Please enter a valid password',
		confirmPassword: 'Retype new password',
		confirmPasswordInValid: 'Password and confirm password does not match',
		resetPasswordSucceed: 'Reset password successfully! Forward to login page after',
		checkEmail: 'Enter code from email'
	},

	accountactivationpage: {
		title: 'Family Store - Account activation',
		formTitle: 'Account activation',
		code: 'Activation code',
		codeInvalid: 'Code is invalid',
		haveAccount: 'Back to login'
	},

	searchPage: {
		title: 'Family Store - Search',
		topContent: 'Search results for',
		emptyMessage: 'No results found Try different or more general keywords',
		sortBy: {
			title: 'Sort by',
			name: 'Product Name',
			quantity: 'Quantity',
			createdDate: 'Created Date',
			price: 'Price'
		},
		sortType: {
			title: 'Sort type',
			asc: 'Ascending',
			desc: 'Descending'
		}
	},

	profilepage: {
		title: 'My account',
		changePassword: 'Change password',
		cancel: 'Cancel',
		selectNewAvatar: 'Select new avatar',
		removeChange: 'X Remove change',
		updateProfilePicture: 'Update profile picture',
		tabTitle: {
			1: 'BASIC PROFILE',
			2: 'CHANGE PASSWORD',
			3: 'AVATAR'
		},
		fullName: 'Full name',
		email: 'Email',
		address: 'Address',
		currentPassword: 'Your current password',
		newPassword: 'New password',
		confirmNewPassword: 'Retype your new password',
		buttonRemove: 'Remove',
		buttonBrowse: 'Browse',
		buttonExecute: 'Save changes'
	},

	productDetailPage: {
		productDescription: 'PRODUCT DESCRIPTION',
		productReview: 'PRODUCT REVIEW',
		suggestions: 'SUGGESTIONS',
		showLess: 'Show Less',
		showMore: 'Show More',
		estimatedDeliveryFee: 'Estimated delivery fee:',
		districtOrWard: 'District / Ward:',
		addToCart: 'ADD TO CART',
		suggestion: 'YOU MAY ALSO LIKE'
	},

	cartModal: {
		cart: 'Cart',
		total: 'Total Amount',
		checkout: 'PROCESS TO CHECKOUT',
		unitPrice: 'Unit Price',
		salePrice: 'Sale price'
	},

	sideBar: {
		categories: 'All Categories'
	},

	adminPage: {
		sideBar: {
			positionName: 'GENERAL MANAGER',
			idName: '[Account ID]: ',
			dashboardName: 'Dashboard',
			user: 'All users',
			product: {
				name: 'Manage Products',
				category: 'Categories',
				subCategory: 'Sub Categories',
				product: 'All Products'
			}
		},

		landing: {
			title: 'MANAGER AREA',
			category: 'TOTAL CATEGORIES: ',
			product: 'TOTAL PRODUCT: ',
			order: 'TOTAL ORDER CREATED: ',
			subCategory: 'TOTAL SUB CATEGORIES: ',
			customer: 'TOTAL CUSTOMER: ',
			staff: 'TOTAL STAFFS: ',
			orderStatistics: 'ORDER STATISTICS'
		},

		user: {
			title: 'USER MANAGER',
			searchPlaceHolder: 'Search user',
			table: {
				id: 'ID',
				fullName: 'Full name',
				email: 'Email',
				phoneNumber: 'Phone Number',
				role: 'Role',
				status: 'Status'
			},
			addingModal: {
				title: 'ADD NEW USER'
			}
		},

		category: {
			title: 'CATEGORY MANAGER',
			searchPlaceHolder: 'Search catagory',
			table: {
				categoryId: 'Category ID',
				categoryName: 'Category Name',
				subCategoryCount: 'Sub Categories inside'
			},
			modal: {
				addingTitle: 'ADD NEW CATEGORY',
				updateTitle: 'UPDATE CATEGORY',
				placeHolder: 'Category Name'
			}
		},

		subCategory: {
			title: 'SUB CATEGORY MANAGER',
			searchPlaceHolder: 'Search sub catagory',
			fatherCatetory: 'Father Category',
			table: {
				subCategoryId: 'Sub Category ID',
				subCategoryName: 'Sub Category Name'
			},
			modal: {
				addtingTitle: 'ADD NEW SUB CATEGORY',
				updateTitle: 'UPDATE SUB CATEGORY',
				placeHolder: 'Sub Category Name'
			}
		},

		product: {
			title: 'PRODUCT MANAGER',
			searchPlaceHolder: 'Search product name',
			table: {
				productId: 'ID',
				productName: 'Product Name',
				image: 'Image',
				category: 'Sub Category',
				quantity: 'Quantity',
				price: 'Price (VNĐ)',
				description: 'Description'
			},
			modal: {
				addingTitle: 'ADD NEW PRODUCT',
				updateTitle: 'UPDATE PRODUCT'
			}
		}
	},

	ordersPage: {
		all: 'ALL ORDERS',
		await: 'AWAITNG CONFIRM',
		delivering: 'DELIVERING',
		delivered: 'DELIVERED',
		canceled: 'CANCELED',
		item: {
			orderId: 'ORDER ID: ',
			createdDate: 'Created date: ',
			deliveryDate: 'Estimated delivery date: ',
			status: 'STATUS: ',
			totalPayment: 'Total payment: '
		},
		details: {
			titleTop: 'ORDER OVERVIEW',
			titleMid: 'PURCHASED PRODUCTS',
			placeHolder: 'Comment what do you think about this product?'
		}
	},

	checkoutPage: {
		address: {
			title: '1. Delivery address',
			form: {
				titleTop: 'Receiver information',
				titleMid: 'Address type',
				namePlaceHolder: 'Full name',
				phoneNumberPlaceHolder: 'Phone number',
				cityPlaceHolder: 'Name of the city',
				districtPlaceHolder: 'Name of district',
				wardPlaceHolder: 'Name of the ward',
				streetPlaceHolder: 'Address, street name'
			}
		},
		others: {
			title: '2. Estimated delivery date: ',
			form: {
				note: 'Notes (Optional)',
				price: 'Total products cots',
				deliveryPrice: 'Delivery fee',
				totalPayment: 'Total payment',
				deliveryMethod: '(PAYMENT ON DELIVERY)'
			}
		},
		success: {
			thanks: 'THANK YOU!',
			title: 'Your Order Has Been Processed',
			message: 'You will receive an email with order details'
		}
	},

	toastMessages: {
		common: {
			error: 'Something broke!',
			success: 'Success!'
		},
		admin: {
			user: {
				addSuccess: 'Add user successfully!',
				updateSuccess: 'Update user successfully!',
				deleteSuccess: 'Delete user successfully!',
				updateRoleSuccess: 'Update Role successfully for id: ',
				updateRoleFail: 'Update Role Failed for id: ',
				updateStatusSuccess: 'Update Status successfully for id: ',
				updateStatusFail: 'Update Status Failed for id: '
			},
			category: {
				deleteSuccess: 'Delete category successfully!',
				addSuccess: 'Add new Category successfully!',
				updateSuccess: 'Update category successfully!'
			},
			subCategory: {
				deleteSuccess: 'Delete sub category successfully!',
				addSuccess: 'Add new sub Category successfully!',
				updateSuccess: 'Update sub category successfully!'
			},
			product: {
				deleteSuccess: 'Delete product successfully!',
				addSuccess: 'Add new product successfully!',
				updateSuccess: 'Update product successfully!',
				updateImageSuccess: 'Update Images for product successfully!'
			}
		},
		user: {
			review: {
				success: 'Reviewed the product successfully!'
			}
		}
	},

	collectionPage: {
		empty: 'There are no products in this category'
	}
};

const resources = {
	en: {
		translation: enTranslation
	},
	vn: {
		translation: vnTranslation
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
