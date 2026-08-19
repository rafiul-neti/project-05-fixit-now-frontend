"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginAction } from "../_actions/authActions";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { USER_ROLE } from "@/lib/types/enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginInputSchema, LoginInput } from "../_validations";
import { Field, FieldLabel } from "@/components/ui/field";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectTo") ?? "";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LoginInput>({ resolver: zodResolver(loginInputSchema) });

  const handleLogin = async (data: LoginInput) => {
    try {
      const result = await loginAction(data);

      toast.add({
        type: "success",
        description: "You have succesfully logged in.",
      });

      setValue("email", "");
      setValue("password", "");

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push(
          result.data?.role === USER_ROLE.Admin
            ? "/dashboard/admin"
            : result.data?.role === USER_ROLE.Technician
              ? "/dashboard/technician"
              : "/dashboard/customer",
        );
      }
    } catch (error: unknown) {
      toast.add({
        type: "error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      <Card className="p-5 space-y-4 text-center">
        <Field>
          {errors.email && (
            <FieldLabel
              htmlFor="email-login"
              className="text-(--error) text-xs"
            >
              {errors.email.message}
            </FieldLabel>
          )}
          <Input
            id="email-login"
            {...register("email")}
            name="email"
            type="email"
            placeholder="email@example.com"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </Field>

        <Field>
          {errors.password && (
            <FieldLabel
              htmlFor="password-login"
              className="text-(--error) text-xs"
            >
              {errors.password.message}
            </FieldLabel>
          )}
          <Input
            id="password-login"
            {...register("password")}
            name="password"
            type="password"
            placeholder="Enter Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
        </Field>

        <Button type="submit" className={`bg-(--color-primary)`}>
          {isSubmitting ? <Spinner /> : "Login"}
        </Button>
        <small>
          {`Don't have account?`} Please{" "}
          <Link href={"/register"} className="text-(--color-primary)">
            Register
          </Link>
        </small>
      </Card>
    </form>
  );
};

export default LoginForm;
