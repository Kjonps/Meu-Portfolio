import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.form.required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t("contact.form.required");
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t("contact.form.invalid_email");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.form.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus("idle");

    try {
      // Initialize EmailJS
      emailjs.init("M3fAocwu67dzh0ID_");

      // Email 1: Send to YOUR email (receive the contact message)
      await emailjs.send(
        "service_rd8flyo",
        "template_mlo01ba", // Contact message template - sends to you
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "jonasrmartins17@gmail.com", // Your email
          recipient_email: "jonasrmartins17@gmail.com", // Your email for the template
        }
      );

      // Email 2: Send confirmation back to the user
      await emailjs.send(
        "service_rd8flyo",
        "template_309pu6s", // Confirmation template - sends to visitor
        {
          from_name: "Jonas Martins",
          from_email: "jonasrmartins17@gmail.com",
          message: `Obrigado pelo contato! Recebemos sua mensagem e em breve responderemos. Você escreveu:\n${formData.message}`,
          to_email: formData.email, // sends to the user now
          recipient_email: formData.email,
        }
      );

      setSubmitStatus("success");
      setStatusMessage(t("contact.form.success"));
      setFormData({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
      setStatusMessage(t("contact.form.error"));

      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
          {t("contact.form.name")}
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={t("contact.form.placeholder.name")}
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          {t("contact.form.email")}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("contact.form.placeholder.email")}
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          {t("contact.form.message")}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("contact.form.placeholder.message")}
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
          rows={5}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {/* Status Alert */}
      {submitStatus === "success" && (
        <Alert className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            {statusMessage}
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-600">
            {statusMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full font-body"
      >
        {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? t("contact.form.sending") : t("contact.form.submit")}
      </Button>
    </form>
  );
};

export default ContactForm;
