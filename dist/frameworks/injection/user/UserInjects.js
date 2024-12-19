"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedChatController = exports.InjectedReviewController = exports.InjectedBookingController = exports.InjectedPostController = exports.InjectedUserForgetPassController = exports.InjectedEditProfileController = exports.InjectedUserResendOtpController = exports.InjectedUserVerifyOtpController = exports.InjectedGoogleAuthController = exports.InjectedUserLoginController = exports.InjectedUserRegisterController = void 0;
const GoogleAuthController_1 = require("../../../interface adapter/controllers/user/GoogleAuthController");
const UserLoginController_1 = require("../../../interface adapter/controllers/user/UserLoginController");
const UserRegisterController_1 = require("../../../interface adapter/controllers/user/UserRegisterController");
const UserVerifyOtpController_1 = require("../../../interface adapter/controllers/user/UserVerifyOtpController");
const UserRepository_1 = require("../../../interface adapter/respository/user/UserRepository");
const GoogleAuthUseCase_1 = require("../../../usecases/user/GoogleAuthUseCase");
const UserLoginUseCase_1 = require("../../../usecases/user/UserLoginUseCase");
const UserRegisterUseCase_1 = require("../../../usecases/user/UserRegisterUseCase");
const UserResendOtpUsecase_1 = require("../../../usecases/user/UserResendOtpUsecase");
const UserVerifyOtpUseCase_1 = require("../../../usecases/user/UserVerifyOtpUseCase");
const UserResendOtpController_1 = require("../../../interface adapter/controllers/user/UserResendOtpController");
const UserForgetPassUseCase_1 = require("../../../usecases/user/UserForgetPassUseCase");
const UserForgetPassController_1 = require("../../../interface adapter/controllers/user/UserForgetPassController");
const UserAddPostUseCase_1 = require("../../../usecases/user/UserAddPostUseCase");
const PostRepository_1 = require("../../../interface adapter/respository/user/PostRepository");
const UserPostController_1 = require("../../../interface adapter/controllers/user/UserPostController");
const UserGetAllPost_1 = require("../../../usecases/user/UserGetAllPost");
const UserEditPostUseCase_1 = require("../../../usecases/user/UserEditPostUseCase");
const UserDeletePostUseCase_1 = require("../../../usecases/user/UserDeletePostUseCase");
const UserGetPostByIdUsecase_1 = require("../../../usecases/user/UserGetPostByIdUsecase");
const UserGetAllPostInShop_1 = require("../../../usecases/user/UserGetAllPostInShop");
const UserGetSingleServiceUseCase_1 = require("../../../usecases/user/UserGetSingleServiceUseCase");
const UserCreateBookingUseCase_1 = require("../../../usecases/user/UserCreateBookingUseCase");
const BookingRepositor_1 = require("../../../interface adapter/respository/user/BookingRepositor");
const BookingController_1 = require("../../../interface adapter/controllers/user/BookingController");
const UserCancelBookingUseCase_1 = require("../../../usecases/user/UserCancelBookingUseCase");
const GetServiceAvailabiltyUseCase_1 = require("../../../usecases/user/GetServiceAvailabiltyUseCase");
const GetBookingByUserIdUsecase_1 = require("../../../usecases/user/GetBookingByUserIdUsecase");
const GetBookingIdDetailsUsecase_1 = require("../../../usecases/user/GetBookingIdDetailsUsecase");
const CreateReviewUsecase_1 = require("../../../usecases/user/CreateReviewUsecase");
const ReviewRepository_1 = require("../../../interface adapter/respository/user/ReviewRepository");
const ReviewController_1 = require("../../../interface adapter/controllers/user/ReviewController");
const GetReviewByserviceIdUsecase_1 = require("../../../usecases/user/GetReviewByserviceIdUsecase");
const GetBookingbyProviderUsecase_1 = require("../../../usecases/user/GetBookingbyProviderUsecase");
const CreateConversationUsecase_1 = require("../../../usecases/user/CreateConversationUsecase");
const ChatRepository_1 = require("../../../interface adapter/respository/user/ChatRepository");
const ChatController_1 = require("../../../interface adapter/controllers/user/ChatController");
const GetConversationByUserId_1 = require("../../../usecases/user/GetConversationByUserId");
const CreateMessageUsecase_1 = require("../../../usecases/user/CreateMessageUsecase");
const GetMessageByIdUsecase_1 = require("../../../usecases/user/GetMessageByIdUsecase");
const FetchingReviewDateUsecase_1 = require("../../../usecases/user/FetchingReviewDateUsecase");
const GetBannerInUserUsecase_1 = require("../../../usecases/user/GetBannerInUserUsecase");
const UserProfileEditUsecase_1 = require("../../../usecases/user/UserProfileEditUsecase");
const UserProfileController_1 = require("../../../interface adapter/controllers/user/UserProfileController");
const stripeKey = "sk_test_51Q7VPGGWw2JRPJ2CWnRQe4HqZgOx1J2UqVdGqoSiMZq0QmwtS7vwIESa7lFbAaRxanFMV8zM4oBj4EmsVwh101oC00gl3FNpnb";
const monoRepository = new UserRepository_1.UserRepository();
const mono2Repository = new PostRepository_1.PostRepository();
const mono3Repository = new BookingRepositor_1.BookingRepository();
const mono4Repository = new ReviewRepository_1.ReviewRepository();
const mono5Repository = new ChatRepository_1.ChatRepository();
//register
const UserRegisterUse = new UserRegisterUseCase_1.UserRegisterUseCase(monoRepository);
exports.InjectedUserRegisterController = new UserRegisterController_1.UserRegisterController(UserRegisterUse);
//login
const UserLoginUse = new UserLoginUseCase_1.UserLoginUseCase(monoRepository);
//userbannerin home
const GetBannerInUserUse = new GetBannerInUserUsecase_1.GetBannerInUserUsecase(monoRepository);
exports.InjectedUserLoginController = new UserLoginController_1.UserLoginController(UserLoginUse, GetBannerInUserUse);
//googleauth
const GoogleAuthUse = new GoogleAuthUseCase_1.GoogleAuthUseCase(monoRepository);
exports.InjectedGoogleAuthController = new GoogleAuthController_1.GoogleOAthController(GoogleAuthUse);
//otp verification
const UserVerifyOtpUse = new UserVerifyOtpUseCase_1.UserVerifyOtpUseCase(monoRepository);
exports.InjectedUserVerifyOtpController = new UserVerifyOtpController_1.UserVerifyOtpController(UserVerifyOtpUse);
//resend otp verification
const UserResendOtpUse = new UserResendOtpUsecase_1.UserResendOtpUseCase(monoRepository);
exports.InjectedUserResendOtpController = new UserResendOtpController_1.ResendOtpController(UserResendOtpUse);
//edit Profile
const UserProfileUse = new UserProfileEditUsecase_1.UserProfileEditUsecase(monoRepository);
exports.InjectedEditProfileController = new UserProfileController_1.UserProfileController(UserProfileUse);
//forget password
const UserForgetPassUse = new UserForgetPassUseCase_1.UserForgetPassUseCase(monoRepository);
exports.InjectedUserForgetPassController = new UserForgetPassController_1.UserForgetPassController(UserForgetPassUse);
//AddPost
const UserAddPostUse = new UserAddPostUseCase_1.UserAddPostUseCase(mono2Repository);
//GetPostByuserId
const UserGetPostByIdUse = new UserGetAllPost_1.UserGetAllPostUseCase(mono2Repository);
//GetPostBypostId
const UserGetPostBypostIdUse = new UserGetPostByIdUsecase_1.UserGetPostByIdUsecase(mono2Repository);
//EditPost
const UserEditPostUse = new UserEditPostUseCase_1.UserEditPostUseCase(mono2Repository);
//DeletePost
const UserDeletePostUse = new UserDeletePostUseCase_1.UserDeletePostUseCase(mono2Repository);
//get all post in shop
const UserGetAllPostInShopUse = new UserGetAllPostInShop_1.UserGetAllPostInShopUseCase(mono2Repository);
//get singleservice details
const UserGetSingleServiceUse = new UserGetSingleServiceUseCase_1.UserGetSingleServiceUseCase(mono2Repository);
// get available dates  && booked dates
const UserGetAvailableDateUse = new GetServiceAvailabiltyUseCase_1.GetServiceAvailabiltyUseCase(mono2Repository, mono3Repository);
exports.InjectedPostController = new UserPostController_1.UserPostController(UserAddPostUse, UserGetPostByIdUse, UserDeletePostUse, UserGetPostBypostIdUse, UserEditPostUse, UserGetAllPostInShopUse, UserGetSingleServiceUse, UserGetAvailableDateUse);
//bookingcreate
const UserCreateBookingUse = new UserCreateBookingUseCase_1.UserCreateBookingUseCase(mono3Repository);
//bookingcancel
const UserCancelBookingUse = new UserCancelBookingUseCase_1.UserCancelBookingUseCase(mono3Repository, stripeKey);
//GetBookdetailsbyUserId
const GetBookByUserIdUse = new GetBookingByUserIdUsecase_1.GetBookingByUserIdUsecase(mono3Repository);
//GetBookiByProvider
const GetBookingByProviderIdUse = new GetBookingbyProviderUsecase_1.GetBookingbyProviderUsecase(mono3Repository);
//getBookeddetailsByiD
const GetBookDetailsByIdUse = new GetBookingIdDetailsUsecase_1.GetBookingIdDetailsUsecase(mono3Repository);
//getBookingDate
const GetBookingDateUse = new FetchingReviewDateUsecase_1.FetchingReviewDateUsecase(mono3Repository);
exports.InjectedBookingController = new BookingController_1.BookingController(UserCreateBookingUse, UserCancelBookingUse, GetBookByUserIdUse, GetBookingByProviderIdUse, GetBookDetailsByIdUse, GetBookingDateUse);
//Reviewcreat
const CreateReviewUse = new CreateReviewUsecase_1.CreateReviewUsecase(mono4Repository, mono3Repository);
//GetreviewByservice
const GetReviewbyserviceUse = new GetReviewByserviceIdUsecase_1.GetReviewByserviceIdUsecase(mono4Repository);
exports.InjectedReviewController = new ReviewController_1.ReviewController(CreateReviewUse, GetReviewbyserviceUse);
//createConversation
const CreateConversationUse = new CreateConversationUsecase_1.CreateConversationUseCase(mono5Repository);
//getconversationByid
const GetConversationByIdUse = new GetConversationByUserId_1.GetConversationByUserIdUseCase(mono5Repository);
//createmessage
const CreateMessageUse = new CreateMessageUsecase_1.CreateMessageUsecase(mono5Repository);
//GetmessageByConId
const GetMessageByIdUse = new GetMessageByIdUsecase_1.GetMessageByIdUseCase(mono5Repository);
exports.InjectedChatController = new ChatController_1.ChatController(CreateConversationUse, GetConversationByIdUse, CreateMessageUse, GetMessageByIdUse);
