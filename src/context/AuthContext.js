// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  userMenu: null,
  userAuths: null,
  useSessionYear: '',
  useSession: '',
  loading: true,
  setUser: () => null,
  setUserMenu: () => null,
  setUserAuths: () => null,
  setSessionYear: () => '',
  setSession: () => '',
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  singlelogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),

  //Martin initialise vendors state
  vendors: [],
  setVendors: () => [],
  handleVendorsdata: () => promise.resolve(),

  //Martin initialise vendaors registration form
  vendor_registration_form: {
    pan_number: '',
    tin: '',
    vendor_name: '',
    owner_name: '',
    vendor_type: '',
    address: ''
  },
  setvendor_registration_form: () => null,
  handleVendorFormChange: () => null,
  handleVendorFormSubmit: () => null,
  
  vendor_form_errorMessage: null,
  setvendor_form_ErrorMessage: () => null,
  handleCloseVendorError: () => null,

  //Martin initialise vendaors transaction form
  vendor_transaction_form: {
    vendor_id: '',
    financial_year: '',
    date_of_payment: '',
    invoice_number: '',
    gross_amount: '',
    it_taxable_amount: '',
    section_code: '', 
},
  setvendor_transaction_form: () => null,
  handleVendorTransactionFormChange: () => null,
  handleVendorTransactionFormSubmit: () => null,
  vendor_transaction_form_errorMessage: null,
  setvendor_transaction_form_ErrorMessage: () => null,

  Transaction_setIsModalOpen : false,
  Transaction_isModalOpen : false,
  Transaction_handleOpenModal : () => null,
  Transaction_handleCloseModal : () => null,

  vendor_transaction_data: [],
  setvendor_transaction_data: () => null,
  handle_vendor_transaction: () => null,

}
const url = process.env.APIURL; 
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [userMenu, setUserMenu] = useState(defaultProvider.userMenu)
  const [userAuths, setUserAuths] = useState(defaultProvider.userAuths)
  const [useSessionYear, setSessionYear] = useState(defaultProvider.useSessionYear)
  const [useSession, setSession] = useState(defaultProvider.useSession)
  const [loading, setLoading] = useState(defaultProvider.loading)
  //Martin set Vendor states
  const [vendors, setVendors] = useState([]);

  //Martin set Vendor registration form states
  const [vendor_registration_form, setvendor_registration_form] = useState(defaultProvider.vendor_registration_form);

  const [vendor_form_errorMessage, setvendor_form_ErrorMessage] = useState(null);

  //Martin set Vendor transaction form states
  const [vendor_transaction_form, setvendor_transaction_form] = useState(defaultProvider.vendor_transaction_form);

  const [vendor_transaction_form_errorMessage, setvendor_transaction_form_ErrorMessage] = useState(null);

  const [Transaction_isModalOpen, Transaction_setIsModalOpen] = useState(false);

  //Martin set Vendor transaction data states

  const [vendor_transaction_data, setvendor_transaction_data] = useState([]);

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    //Martin calling them in start
      handleVendorsdata();
      handle_vendor_transaction();
    
    //
    const initAuth = async () => {
      if (window.location.href.indexOf("login") != -1){
        localStorage.removeItem('userData')
        localStorage.removeItem('userMenu')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        setUser(null)
        setUserMenu(null)
        setSession('')
        setSessionYear('')
        setUserAuths(null)
        setLoading(false)
      }
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(url + 'refresh', {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            // setUser({ ...response.data.userData })
            if (response.data.status === true) {
             
              setUser({ ...response.data.data.user_details })
              setUserMenu({ ...response.data.data.user_menu_details })
              setSession({ ...response.data.data.session })
              setSessionYear({ ...response.data.data.session_year })
              setUserAuths(Object.values({ ...response.data.data.user_auth }))
              // console.log(Object.values({ ...response.data.data.user_auth }))
              if (window.location.href.indexOf("login") != -1){
              const returnUrl = router.query.returnUrl
              const redirectURL = returnUrl && returnUrl !== '/home' ? returnUrl : '/home'
              router.replace(redirectURL)
              }
              // const returnUrl = router.query.returnUrl
              // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
              // router.replace(redirectURL)
            } else {
              localStorage.removeItem('userData')
              localStorage.removeItem('userMenu')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('accessToken')
              setUser(null)
              setUserMenu(null)
              setSession('')
              setSessionYear('')
              setUserAuths(null)
              setLoading(false)
              alert("Your Session Expire !");
              //    toast.error(response)
              //   NotificationManager.error("error", 'Error');
              const returnUrl = router.query.returnUrl
              const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
              router.replace(redirectURL)

            }


          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('userMenu')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            console.log('nooo')
            setUser(null)
            setUserMenu(null)
            setUserAuths(null)
            setLoading(false)
            router.replace('/login')
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        console.log('nooo')
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSinglelogin = (params, errorCallback) => {
    axios
      .post(url + 'validateuser', params)
      .then(async response => {
        if (response.data.status === true) {
          // params.rememberMe
          //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          //   : null
          const returnUrl = router.query.returnUrl
          //  window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token)

          setUser({ ...response.data.data.user_details })
          setUserMenu({ ...response.data.data.user_menu_details })
          setUserAuths(Object.values({ ...response.data.data.user_auth }))
          setSession({ ...response.data.data.session })
          setSessionYear({ ...response.data.data.session_year })
          //  console.log(Object.values({ ...response.data.data.user_auth }))
          window.localStorage.setItem('userData', JSON.stringify(response.data.data.user_details))
          window.localStorage.setItem('userMenu', JSON.stringify(response.data.data.user_menu_details))

          //  params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
        } else {
           router.push('/login')
          console.log('innaaaa'+response.data)
          errorCallback(response.data)
        }
      })
      .catch(err => {
        router.push('/login')
        console.log('s')
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogin = (params, errorCallback) => {
    axios
      .post(url + 'login', params)
      .then(async response => {
        if (response.data.status === true) {
          // params.rememberMe
          //   ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          //   : null
          const returnUrl = router.query.returnUrl
          //  window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token)
          window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.data.token)

          setUser({ ...response.data.data.user_details })
          setUserMenu({ ...response.data.data.user_menu_details })
          setUserAuths(Object.values({ ...response.data.data.user_auth }))
          setSession({ ...response.data.data.session })
          setSessionYear({ ...response.data.data.session_year })
          //  console.log(Object.values({ ...response.data.data.user_auth }))
          window.localStorage.setItem('userData', JSON.stringify(response.data.data.user_details))
          window.localStorage.setItem('userMenu', JSON.stringify(response.data.data.user_menu_details))

          //  params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
          router.replace(redirectURL)
        } else {
          errorCallback(response.data)
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setUserMenu(null)
    setUserAuths(null)

    setSession('')
    setSessionYear('')
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('userMenu')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

    // Martin vendors data showing function

    const handleVendorsdata = async () => {
      try {
          const response = await axios.get(url+'vendors');
          setVendors(response.data);
      } catch (error) {
          console.error('Error fetching vendors:', error);
          return [];
      }
    };

    //Martin vendors transaction data showing function

    const handle_vendor_transaction = async () => {
      try {
          const response = await axios
          .get(url+'vendor-transactions');
          setvendor_transaction_data(response.data);
      } catch (error) {

          console.error('Error fetching vendors:', error);
          return [];
      }
    };


    
    //Martin vendors registration form
    const handleVendorFormSubmit = async (e) => {
      e.preventDefault();
      try {
      const response = await axios.post(url+'vendors', vendor_registration_form);
      console.log("Form submitted : ", response.data);
      setvendor_registration_form({
        pan_number: '',
        tin: '',
        vendor_name: '',
        owner_name: '',
        vendor_type: '',
        address: ''
      });
      setvendor_form_ErrorMessage("Submitted");
      return response.data;
      } catch (error) {
        setvendor_form_ErrorMessage(error.response.data.errors.pan_number[0]);
        console.log("Error : ",error.response.data.errors.pan_number[0] , "type : ",typeof(error.response.data.errors.pan_number[0]));
          
          console.log("Vendor form error : ",vendor_form_errorMessage);
          setvendor_registration_form({
            pan_number: '',
            tin: '',
            vendor_name: '',
            owner_name: '',
            vendor_type: '',
            address: '' 
          });
      }
      
    }

    const handleVendorFormChange =  (e) => {
      console.log("Form data changed : ",e.target.name, e.target.value);
      setvendor_registration_form({...vendor_registration_form, [e.target.name]: e.target.value});
    }
    
    
    
    //Martin vendors transaction form
    
    const handleVendorTransactionFormSubmit = async (e) => {
      Transaction_handleCloseModal();
      e.preventDefault();
      try {
        const response = await axios.post(url+'vendor-transactions', vendor_transaction_form);
        console.log("Form submitted : ", response.data);
        setvendor_transaction_form_ErrorMessage("Submitted");
        setvendor_transaction_form({
          vendor_id: '',
          financial_year: '',
          date_of_payment: '',
          invoice_number: '',
          gross_amount: '',
          it_taxable_amount: '',
          section_code: '', 
      });
      setvendor_form_ErrorMessage("Submitted");
      return response.data;
    } catch (error) {
      setvendor_transaction_form_ErrorMessage("Error in form submission");
      console.log("error : ",error);
      setvendor_transaction_form({
        vendor_id: '',
        financial_year: '',
        date_of_payment: '',
        invoice_number: '',
        gross_amount: '',
        it_taxable_amount: '',
        section_code: '', 
      });
    }
    
  }
  
    const handleVendorTransactionFormChange =  (e) => {
      console.log("Transaction Form data changed : ",e.target.name, e.target.value);
      setvendor_transaction_form({...vendor_transaction_form, [e.target.name]: e.target.value});
      
    }
    
    const handleCloseVendorError = () => {
      setvendor_form_ErrorMessage(null);
      setvendor_transaction_form_ErrorMessage(null);
    }
    
    //Martin modal of transaction form
   

    const Transaction_handleOpenModal = () => {
      Transaction_setIsModalOpen(true);
    };
  
    const Transaction_handleCloseModal = () => {
      Transaction_setIsModalOpen(false);
    };
  
    const Transaction_handleSubmit = (e) => {
      e.preventDefault();
      console.log("Transaction_handleCloseModal");
      Transaction_handleOpenModal();
    };
    
    
    const values = {
    user,
    loading,
    setUser,
    userMenu,
    userAuths,
    useSessionYear,
    useSession,
    setSession,
    setSessionYear,
    setUserMenu,
    setUserAuths,
    setLoading,
    login: handleLogin,
    singlelogin:handleSinglelogin,
    logout: handleLogout,
    register: handleRegister,

    //Martin, Providing context vendors states 
    vendors,
    setVendors,
    handleVendorsdata,

    //Martin, Providing context for vendors registration form
    vendor_registration_form,
    setvendor_registration_form,
    handleVendorFormChange,
    handleVendorFormSubmit,
    vendor_form_errorMessage,
    setvendor_form_ErrorMessage,
    handleCloseVendorError,

    //Martin, Providing context for vendors transaction form
    vendor_transaction_form,
    setvendor_transaction_form,
    handleVendorTransactionFormChange,
    handleVendorTransactionFormSubmit,
    vendor_transaction_form_errorMessage,
    setvendor_transaction_form_ErrorMessage,

    //Martin, Providing context for vendors transaction modal
    Transaction_isModalOpen,
    Transaction_handleOpenModal,
    Transaction_handleCloseModal,
    Transaction_handleSubmit,

    //Martin, Providing context for vendors transaction data
    vendor_transaction_data,
    setvendor_transaction_data,
    handle_vendor_transaction


  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
