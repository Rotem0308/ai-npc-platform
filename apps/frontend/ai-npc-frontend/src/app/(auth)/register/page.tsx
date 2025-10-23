"use client";
import { registerSchema, RegisterSchema } from "@/app/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { RoleValues } from "@/constants/user.const";
import { Role } from "@/enums/user.enum";
import { http } from "@/services/http.service";
import { isRequired } from "@/utils/form.util";

const RegisterPage = () => {
  const registerForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: Role.USER,
    },
  });

  async function onSubmit(values: RegisterSchema) {
    console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);
    if (http.isValidUrl(process.env.NEXT_PUBLIC_BACKEND_API_URL)) {
      const baseUrl = new URL(
        process.env.NEXT_PUBLIC_BACKEND_API_URL! + "/auth" + "/register"
      );
      console.log("sent");
      const res = await http.post(baseUrl, values);
      console.log(res);
    }
  }

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={registerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                {isRequired(registerSchema.shape.name) && (
                  <span className="text-red-500">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
                {isRequired(registerSchema.shape.email) && (
                  <span className="text-red-500">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
                {isRequired(registerSchema.shape.password) && (
                  <span className="text-red-500">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone
                {isRequired(registerSchema.shape.phone) && (
                  <span className="text-red-500">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Avatar URL
                {isRequired(registerSchema.shape.avatarUrl) && (
                  <span className="text-red-500">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="[https://example.com/avatar.jpg](https://example.com/avatar.jpg)"
                  {...field}
                />
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Roles" />
                  </SelectTrigger>
                  <SelectContent side="right">
                    {RoleValues.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={registerForm.formState.isSubmitting}
          className="btn-glow-blue"
        >
          {registerForm.formState.isSubmitting && <Spinner />}
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterPage;
