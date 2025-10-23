"use client";
import { loginSchema, LoginSchema } from "@/app/schemas/login.schema";
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
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const LoginPage = () => {
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema), // runs Zod validation automatically every time the form changes or is submitted.
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    await new Promise((resolve) =>
      setTimeout(() => console.log(resolve("")), 5000)
    );
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              {/* <FormDescription>UserEmail</FormDescription> */}
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              {/* <FormDescription>User Password </FormDescription> */}
              <FormMessage className="error-message" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          disabled={loginForm.formState.isSubmitting}
          className="btn-glow-blue"
        >
          {loginForm.formState.isSubmitting && <Spinner />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginPage;
