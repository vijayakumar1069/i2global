"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userSet } from "@/utils/slice";
import { getUrl } from "@/utils/getUrl";
import useFetch from "@/customehooks/useFetch";

// Zod validation schemas
const signUpSchema = z
  .object({
    username: z.string().min(2, { message: "Enter at least 2 characters." }),
    email: z.string().email({ message: "Enter a valid email address." }),
    password: z
      .string()
      .min(2, { message: "Password must have 6+ characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

const signInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address." }),
  password: z.string().min(2, { message: "Password must have 6+ characters." }),
});

export default function AuthForm({ signUp = true }) {
  const [isSignUp, setIsSignUp] = useState(signUp);
  const route = useRouter();
  const dispatch = useDispatch();
  const { loading, data, error, fetchData, setError } = useFetch();

  // Get appropriate schema (SignUp or SignIn)
  const schema = isSignUp ? signUpSchema : signInSchema;

  // React Hook Form setup
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData) => {
    const backendUrl = getUrl(); // Define backend URL based on environment
    const endpoint = isSignUp
      ? `${backendUrl}/api/v1/user-auth/register`
      : `${backendUrl}/api/v1/user-auth/login`;

    console.log(endpoint);

    // Directly get the response data
    const responseData = await fetchData(endpoint, "POST", formData);

    // Update the dispatch call
    if (responseData && responseData.statusCode === 200) {
      const username = responseData.user?.username;

      if (!username) {
        setError({ message: "Username missing in response" });
        return;
      }

      dispatch(userSet(username));
      route.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center   ">
      <div className=" w-screen max-w-3xl mx-auto bg-gradient-to-br from-slate-100 to-slate-200 p-8 rounded-lg shadow-md">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Register Your Account " : "Login"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Conditional Inputs for SignUp or SignIn */}
            {isSignUp && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password (SignUp only) */}
            {isSignUp && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              {isSignUp
                ? loading
                  ? "Loading..."
                  : "Sign Up"
                : loading
                ? "Loading..."
                : "Sign In"}
            </Button>
            {error && (
              <div className="text-red-500 text-center mt-2">
                {error.message}
              </div>
            )}
          </form>
        </Form>

        {/* Toggle Buttons */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-500">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            </p>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
