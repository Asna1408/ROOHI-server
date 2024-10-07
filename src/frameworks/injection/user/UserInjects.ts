import { GoogleOAthController } from "../../../interface adapter/controllers/user/GoogleAuthController";
import { UserLoginController } from "../../../interface adapter/controllers/user/UserLoginController";
import { UserRegisterController } from "../../../interface adapter/controllers/user/UserRegisterController";
import { UserVerifyOtpController } from "../../../interface adapter/controllers/user/UserVerifyOtpController";
import { UserRepository } from "../../../interface adapter/respository/user/UserRepository";
import { GoogleAuthUseCase } from "../../../usecases/user/GoogleAuthUseCase";
import { UserLoginUseCase } from "../../../usecases/user/UserLoginUseCase";
import { UserRegisterUseCase } from "../../../usecases/user/UserRegisterUseCase";
import { UserResendOtpUseCase } from "../../../usecases/user/UserResendOtpUsecase";
import { UserVerifyOtpUseCase } from "../../../usecases/user/UserVerifyOtpUseCase";
import { ResendOtpController } from "../../../interface adapter/controllers/user/UserResendOtpController";
import { UserForgetPassUseCase } from "../../../usecases/user/UserForgetPassUseCase";
import { UserForgetPassController } from "../../../interface adapter/controllers/user/UserForgetPassController";
import { UserAddPostUseCase } from "../../../usecases/user/UserAddPostUseCase";
import { PostRepository } from "../../../interface adapter/respository/user/PostRepository";
import { UserPostController } from "../../../interface adapter/controllers/user/UserPostController";
import { UserGetAllPostUseCase } from "../../../usecases/user/UserGetAllPost";
import { UserEditPostUseCase } from "../../../usecases/user/UserEditPostUseCase";
import { UserDeletePostUseCase } from "../../../usecases/user/UserDeletePostUseCase";
import { UserGetPostByIdUsecase } from "../../../usecases/user/UserGetPostByIdUsecase";


const monoRepository = new UserRepository();
const mono2Repository = new PostRepository

//register
const UserRegisterUse = new UserRegisterUseCase(monoRepository)
export const InjectedUserRegisterController = new UserRegisterController(UserRegisterUse);

//login
const UserLoginUse = new UserLoginUseCase(monoRepository);
export const InjectedUserLoginController = new UserLoginController(UserLoginUse);

//googleauth
const GoogleAuthUse = new GoogleAuthUseCase(monoRepository);
export const InjectedGoogleAuthController = new GoogleOAthController(GoogleAuthUse);

//otp verification
const UserVerifyOtpUse = new UserVerifyOtpUseCase(monoRepository);
export const InjectedUserVerifyOtpController = new UserVerifyOtpController(UserVerifyOtpUse);

//resend otp verification
const UserResendOtpUse = new UserResendOtpUseCase(monoRepository);
export const InjectedUserResendOtpController = new ResendOtpController(UserResendOtpUse);

//forget password
const UserForgetPassUse = new UserForgetPassUseCase(monoRepository);
export const InjectedUserForgetPassController = new UserForgetPassController(UserForgetPassUse);

//AddPost
const UserAddPostUse = new UserAddPostUseCase(mono2Repository)

//GetPostByuserId
const UserGetPostByIdUse =new UserGetAllPostUseCase(mono2Repository)

//GetPostBypostId
const UserGetPostBypostIdUse = new UserGetPostByIdUsecase(mono2Repository)

//EditPost
const UserEditPostUse = new UserEditPostUseCase(mono2Repository)

//DeletePost
const UserDeletePostUse = new UserDeletePostUseCase(mono2Repository)

export const InjectedAddPostController = new UserPostController(UserAddPostUse,UserGetPostByIdUse,UserDeletePostUse,UserGetPostBypostIdUse,UserEditPostUse)