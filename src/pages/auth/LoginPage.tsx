import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../themes";
import { useForm, FormFieldConfig } from "../../hooks/useForm";
import { FormItem } from "../../components";
import { getDefaultRouteForRole } from "../../components/ProtectedRoute";
import { GraduationIcon, SunIcon, MoonIcon } from "../../assets/icons";

const loginFields: FormFieldConfig[] = [
  {
    name: "username",
    label: "Tên đăng nhập",
    type: "text",
    placeholder: "Nhập tên đăng nhập",
    required: true,
    minLength: 3,
  },
  {
    name: "password",
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập mật khẩu",
    required: true,
    minLength: 6,
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
  } = useForm(loginFields);

  const onSubmit = async (formValues: Record<string, string>) => {
    const success = await login(formValues.username, formValues.password);

    if (success) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        navigate(getDefaultRouteForRole(user.role), { replace: true });
      }
    } else {
      setFieldError("username", "Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="login-container">
      <div className="login-theme-toggle">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <img
            src={themeMode === "light" ? MoonIcon : SunIcon}
            alt="Toggle theme"
            className="icon"
          />
        </button>
      </div>

      <div className="login-card">
        <h2 className="login-title">
          <img src={GraduationIcon} alt="" className="icon" />
          Đăng nhập
        </h2>

        {errors.username && touched.username && errors.username.includes("không đúng") && (
          <div className="login-error-message">{errors.username}</div>
        )}

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            label="Tên đăng nhập"
            name="username"
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={values.username}
            error={touched.username && !errors.username?.includes("không đúng") ? errors.username : undefined}
            required
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />

          <FormItem
            label="Mật khẩu"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
            value={values.password}
            error={touched.password ? errors.password : undefined}
            required
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="login-info">
          <p className="login-info-title">Tài khoản test:</p>
          <p>Admin: admin / admin@123</p>
        </div>
      </div>
    </div>
  );
}
