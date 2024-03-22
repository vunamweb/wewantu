import {
  createStackNavigator,
  CardStyleInterpolators,
} from "react-navigation-stack";

import Splash1 from "../../app/screen/Splash1";
import RegisterScreen_1 from "../screen/RegisterScreen_1";
import RegisterScreen_2 from "../screen/RegisterScreen_2";
import RegisterScreen_3 from "../screen/RegisterScreen_3";
import LoginScreen from "../../app/screen/LoginScreen";
import ConfirmScreen from "../../app/screen/ConfirmScreen";
import ForgotPassWordScreen from "../../app/screen/ForgotPassWordScreen";
import HomeScreen from "../../app/screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import SettingScreen from "../screen/SettingScreen";
import PersonalScreen from "../screen/PersonalScreen";
import ChangePasswordScreen from "../screen/ChangePasswordScreen";
import PersonalData_1 from "../screen/PersonalData_1";
import PersonalData_2 from "../screen/PersonalData_2";
import PersonalData_3 from "../screen/PersonalData_3";
import PersonalData_4 from "../screen/PersonalData_4";
import PersonalData_Language from "../screen/PersonalData_Language";
import SchoolScreen from "../screen/SchoolScreen";
import TrainingUniversity from "../screen/TrainingUniversity";
import TrainingUniversity_1 from "../screen/TrainingUniversity_1";
import FinalTrainingUniversity from "../screen/FinalTrainingUniversity";
import AddEducation from "../screen/AddEducation";
import ReviewTrainingUniversity from "../screen/ReviewTrainingUniversity";
import Driver from "../screen/Driver";
import Hobiess from "../screen/Hobiess";
import UploadDocument from "../screen/UploadDocument";
import WillingnessChange from "../screen/WillingnessChange";
import FellWork from "../screen/FellWork";
import FellHome from "../screen/FellHome";
import Job from "../screen/Job";
import NewJob from "../screen/NewJob";
import ConfirmLike from "../screen/ConfirmLike";
import ConfirmDeleteJob from "../screen/ConfirmDeleteJob";
import DeleteJob from "../screen/DeleteJob";
import LikeJob from "../screen/LikeJob";
import DetailJob from "../screen/DetailJob";
import MarkJob from "../screen/MarkJob";
import Message from "../screen/Message";
import Info from "../screen/Info";
import JobProfile from "../screen/JobProfile";
import JobProfile_1 from "../screen/JobProfile_1";
import JobProfile_2 from "../screen/JobProfile_2";
import JobProfile_3 from "../screen/JobProfile_3";
import JobProfile_4 from "../screen/JobProfile_4";
import JobProfile_5 from "../screen/JobProfile_5";
import JobProfile_6 from "../screen/JobProfile_6";
import JobProfile_7 from "../screen/JobProfile_7";
import JobProfileFinal from "../screen/JobProfileFinal";
import WorkLife from "../screen/WorkLife";
import Wlb from "../screen/Wlb";
import WorkFeeling from "../screen/WorkFeeling";
import WorkChart from "../screen/WorkChart";
import HowLong from "../screen/HowLong";
import Language from "../screen/Language";
import Faq from "../screen/Faq";
import Content from "../screen/Content";
import Tipp from "../screen/Tipp";
import HowToUse from "../screen/HowToUse";
import Help from "../screen/Help";
import Chat from "../screen/Chat";
import UploadDocument_1 from "../screen/UploadDocument_1";

class Router {
  initNavigarion = () => {
    return createStackNavigator(
      {
       Splash1: {
          screen: Splash1,
          navigationOptions: {
            header: null,
          },
        },

        LoginScreen: {
          screen: LoginScreen,
          navigationOptions: {
            header: null,
          },
        },

        RegisterScreen_1: {
          screen: RegisterScreen_1,
          navigationOptions: {
            header: null,
          },
        },

        RegisterScreen_2: {
          screen: RegisterScreen_2,
          navigationOptions: {
            header: null,
          },
        },

        RegisterScreen_3: {
          screen: RegisterScreen_3,
          navigationOptions: {
            header: null,
          },
        },

        PersonalData_4: {
          screen: PersonalData_4,
          navigationOptions: {
            header: null,
          },
        },

        PersonalData_Language: {
          screen: PersonalData_Language,
          navigationOptions: {
            header: null,
          },
        }, 

        SchoolScreen: {
          screen: SchoolScreen,
          navigationOptions: {
            header: null,
          },
        },

        TrainingUniversity: {
          screen: TrainingUniversity,
          navigationOptions: {
            header: null,
          },
        },

        TrainingUniversity_1: {
          screen: TrainingUniversity_1,
          navigationOptions: {
            header: null,
          },
        },

        AddEducation: {
          screen: AddEducation,
          navigationOptions: {
            header: null,
          },
        },

        ReviewTrainingUniversity: {
          screen: ReviewTrainingUniversity,
          navigationOptions: {
            header: null,
          },
        },

        FinalTrainingUniversity: {
          screen: FinalTrainingUniversity,
          navigationOptions: {
            header: null,
          },
        },

       
        HomeScreen: {
          screen: HomeScreen,
          navigationOptions: {
            header: null,
          },
        },

        ConfirmScreen: {
          screen: ConfirmScreen,
        },

        ForgotPassWordScreen: {
          screen: ForgotPassWordScreen,
        },

        HomeScreen: {
          screen: HomeScreen,
          navigationOptions: {
            header: null,
          },
        },

        ProfileScreen: {
          screen: ProfileScreen,
          navigationOptions: {
            header: null,
          },
        },

        SettingScreen: {
          screen: SettingScreen,
          navigationOptions: {
            header: null,
          },
        },

        PersonalScreen: {
          screen: PersonalScreen,
        },

        PersonalData_1: {
          screen: PersonalData_1,
          navigationOptions: {
            header: null,
          },
        },

        PersonalData_2: {
          screen: PersonalData_2,
          navigationOptions: {
            header: null,
          },
        },

        PersonalData_3: {
          screen: PersonalData_3,
          navigationOptions: {
            header: null,
          },
        },

        ChangePasswordScreen: {
          screen: ChangePasswordScreen,
        },

        Driver: {
          screen: Driver,
          navigationOptions: {
            header: null,
          },
        },

        Hobiess: {
          screen: Hobiess,
          navigationOptions: {
            header: null,
          },
        },

        UploadDocument: {
          screen: UploadDocument,
          navigationOptions: {
            header: null,
          },
        },

        WillingnessChange: {
          screen: WillingnessChange,
          navigationOptions: {
            header: null,
          },
        },

        FellWork: {
          screen: FellWork,
          navigationOptions: {
            header: null,
          },
        },

        FellHome: {
          screen: FellHome,
          navigationOptions: {
            header: null,
          },
        },

        Job: {
          screen: Job,
          navigationOptions: {
            header: null,
          },
        },

        NewJob: {
          screen: NewJob,
          navigationOptions: {
            header: null,
          },
        },

        ConfirmLike: {
          screen: ConfirmLike,
          navigationOptions: {
            header: null,
          },
        },

        ConfirmDeleteJob: {
          screen: ConfirmDeleteJob,
          navigationOptions: {
            header: null,
          },
        },

        DeleteJob: {
          screen: DeleteJob,
          navigationOptions: {
            header: null,
          },
        },

        LikeJob: {
          screen: LikeJob,
          navigationOptions: {
            header: null,
          },
        },

        DetailJob: {
          screen: DetailJob,
          navigationOptions: {
            header: null,
          },
        },

        MarkJob: {
          screen: MarkJob,
          navigationOptions: {
            header: null,
          },
        },

        Message: {
          screen: Message,
          navigationOptions: {
            header: null,
          },
        },

        Info: {
          screen: Info,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile: {
          screen: JobProfile,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_1: {
          screen: JobProfile_1,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_2: {
          screen: JobProfile_2,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_3: {
          screen: JobProfile_3,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_4: {
          screen: JobProfile_4,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_5: {
          screen: JobProfile_5,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_6: {
          screen: JobProfile_6,
          navigationOptions: {
            header: null,
          },
        },

        JobProfile_7: {
          screen: JobProfile_7,
          navigationOptions: {
            header: null,
          },
        },

        JobProfileFinal: {
          screen: JobProfileFinal,
          navigationOptions: {
            header: null,
          },
        },

        WorkLife: {
          screen: WorkLife,
          navigationOptions: {
            header: null,
          },
        },

        Wlb: {
          screen: Wlb,
          navigationOptions: {
            header: null,
          },
        },

        WorkFeeling: {
          screen: WorkFeeling,
          navigationOptions: {
            header: null,
          },
        },

        WorkChart: {
          screen: WorkChart,
          navigationOptions: {
            header: null,
          },
        },

        HowLong: {
          screen: HowLong,
          navigationOptions: {
            header: null,
          },
        },

        Language: {
          screen: Language,
          navigationOptions: {
            header: null,
          },
        },

        Faq: {
          screen: Faq,
          navigationOptions: {
            header: null,
          },
        },

        Content: {
          screen: Content,
          navigationOptions: {
            header: null,
          },
        },

        Tipp: {
          screen: Tipp,
          navigationOptions: {
            header: null,
          },
        },

        HowToUse: {
          screen: HowToUse,
          navigationOptions: {
            header: null,
          },
        },

        Help: {
          screen: Help,
          navigationOptions: {
            header: null,
          },
        },

        Chat: {
          screen: Chat,
          navigationOptions: {
            header: null,
          },
        },

        Record: {
          screen: UploadDocument_1,
          navigationOptions: {
           
          },
        },
      },
      {
        defaultNavigationOptions: {
          //headerShown: false,
          //gestureEnabled: false,
          //swipeEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        },
      }
    );
  };
}

const router = new Router();
export default router;
