"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterInput,
  registerInputSchema,
  RegisterOutput,
} from "../_validations";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { USER_ROLE } from "@/lib/types/enum";
import { registerAction } from "../_actions/authActions";
import { toast } from "@/components/ui/toast";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerInputSchema),
    defaultValues: {
      registeringAs: USER_ROLE.Customer,
    },
  });

  const registeringAs = useWatch({ control, name: "registeringAs" });

  const technicianErrors =
    "technician" in errors ? errors.technician : undefined;

  const handleRegister = async (data: RegisterOutput) => {
    try {
      const result = await registerAction(data);

      toast.add({
        type: "success",
        description: `${result.message} Please Login.`,
      });

      reset();

      router.push("/login");
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
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
      <Card className="p-5 space-y-4 text-center">
        {/* name */}
        <Field>
          {errors.name ? (
            <FieldLabel htmlFor="user_name" className="text-(--error) text-xs">
              {errors.name.message}
            </FieldLabel>
          ) : (
            <FieldLabel>Your Name</FieldLabel>
          )}
          <Input
            id="user_name"
            {...register("name")}
            type="text"
            placeholder="Full Name"
            aria-invalid={errors.name ? "true" : "false"}
          />
        </Field>

        {/* email */}
        <Field>
          {errors.email ? (
            <FieldLabel
              htmlFor="register_email"
              className="text-(--error) text-xs"
            >
              {errors.email.message}
            </FieldLabel>
          ) : (
            <FieldLabel>Email Address</FieldLabel>
          )}
          <Input
            id="register_email"
            {...register("email")}
            type="email"
            placeholder="email@example.com"
            aria-invalid={errors.email ? "true" : "false"}
          />
        </Field>

        {/* phone number */}
        <Field>
          {errors.phone ? (
            <FieldLabel htmlFor="phone" className="text-(--error) text-xs">
              {errors.phone.message}
            </FieldLabel>
          ) : (
            <FieldLabel>Phone Number</FieldLabel>
          )}
          <Input
            id="phone"
            {...register("phone")}
            type="text"
            placeholder="01*********"
            aria-invalid={errors.phone ? "true" : "false"}
          />
        </Field>

        {/* password */}
        <Field>
          {errors.password ? (
            <FieldLabel htmlFor="password" className="text-(--error) text-xs">
              {errors.password.message}
            </FieldLabel>
          ) : (
            <FieldLabel>Password</FieldLabel>
          )}
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter Password"
            aria-invalid={errors.password ? "true" : "false"}
          />
        </Field>

        {/* profile photo */}
        <Field>
          {errors.profilePhoto ? (
            <FieldLabel
              htmlFor="profilePhoto"
              className="text-(--error) text-xs"
            >
              {errors.profilePhoto.message}
            </FieldLabel>
          ) : (
            <FieldLabel>Profile Photo URL</FieldLabel>
          )}
          <Input
            id="profilePhoto"
            {...register("profilePhoto")}
            type="text"
            placeholder="Profile Photo"
            aria-invalid={errors.profilePhoto ? "true" : "false"}
          />
        </Field>

        {/* registering as (TECHNICIAN or CUSTOMER) */}
        <Field>
          {errors.registeringAs ? (
            <FieldLabel className="text-(--error) text-xs">
              {errors.registeringAs.message}
            </FieldLabel>
          ) : (
            <FieldLabel>Register as</FieldLabel>
          )}

          <Controller
            name="registeringAs"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-row gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={USER_ROLE.Customer} id="customer" />
                  <FieldLabel htmlFor="customer" className="cursor-pointer">
                    Customer
                  </FieldLabel>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value={USER_ROLE.Technician}
                    id="technician"
                  />
                  <FieldLabel htmlFor="technician" className="cursor-pointer">
                    Technician
                  </FieldLabel>
                </div>
              </RadioGroup>
            )}
          />
        </Field>

        {registeringAs === USER_ROLE.Technician && (
          <>
            {/* Bio */}
            <Field>
              {technicianErrors?.bio ? (
                <FieldLabel htmlFor="bio" className="text-(--error) text-xs">
                  {technicianErrors?.bio.message}
                </FieldLabel>
              ) : (
                <FieldLabel>Something About You</FieldLabel>
              )}
              <Input
                id="bio"
                {...register("technician.bio")}
                type="text"
                placeholder="Bio"
                aria-invalid={technicianErrors?.bio ? "true" : "false"}
              />
            </Field>

            {/* experience years */}
            <Field>
              {technicianErrors?.experienceYears ? (
                <FieldLabel
                  htmlFor="experience"
                  className="text-(--error) text-xs"
                >
                  {technicianErrors?.experienceYears?.message}
                </FieldLabel>
              ) : (
                <FieldLabel>Experience Years (if you have any)</FieldLabel>
              )}
              <Input
                id="experience"
                {...register("technician.experienceYears")}
                defaultValue={0}
                type="number"
                placeholder="Experience Year(s)"
                aria-invalid={
                  technicianErrors?.experienceYears ? "true" : "false"
                }
              />
            </Field>

            {/* hourly rate */}
            <Field>
              {technicianErrors?.hourlyRate ? (
                <FieldLabel htmlFor="rate-h" className="text-(--error) text-xs">
                  {technicianErrors?.hourlyRate.message}
                </FieldLabel>
              ) : (
                <FieldLabel>How much you charge per hour</FieldLabel>
              )}
              <Input
                id="rate-h"
                {...register("technician.hourlyRate")}
                type="number"
                placeholder="Hourly Rate"
                aria-invalid={technicianErrors?.hourlyRate ? "true" : "false"}
              />
            </Field>

            {/* service areas */}
            <Field>
              {technicianErrors?.serviceAreas ? (
                <FieldLabel htmlFor="rate-h" className="text-(--error) text-xs">
                  {technicianErrors?.serviceAreas.message}
                </FieldLabel>
              ) : (
                <FieldLabel>Your Service Areas (comma separated)</FieldLabel>
              )}
              <Input
                id="rate-h"
                {...register("technician.serviceAreas")}
                type="text"
                placeholder="e.g Rajshahi, Natore"
                aria-invalid={technicianErrors?.serviceAreas ? "true" : "false"}
              />
            </Field>

            {/* weekend */}
            <Field>
              {technicianErrors?.weekendDays ? (
                <FieldLabel
                  htmlFor="weekend"
                  className="text-(--error) text-xs"
                >
                  {technicianErrors?.weekendDays.message}
                </FieldLabel>
              ) : (
                <FieldLabel>Weekend Day</FieldLabel>
              )}
              <Input
                id="weekend"
                {...register("technician.weekendDays")}
                type="text"
                placeholder="e.g FRI"
                aria-invalid={technicianErrors?.weekendDays ? "true" : "false"}
              />
            </Field>

            {/* start time */}
            <Field>
              {technicianErrors?.startTime ? (
                <FieldLabel
                  htmlFor="startTime"
                  className="text-(--error) text-xs"
                >
                  {technicianErrors?.startTime.message}
                </FieldLabel>
              ) : (
                <FieldLabel>Service Time Starts At</FieldLabel>
              )}
              <Input
                id="startTime"
                {...register("technician.startTime")}
                type="text"
                placeholder="e.g 09:00"
                aria-invalid={technicianErrors?.startTime ? "true" : "false"}
              />
            </Field>

            {/* end time */}
            <Field>
              {technicianErrors?.endTime ? (
                <FieldLabel
                  htmlFor="endTime"
                  className="text-(--error) text-xs"
                >
                  {technicianErrors?.endTime.message}
                </FieldLabel>
              ) : (
                <FieldLabel>Service Time Ends At</FieldLabel>
              )}
              <Input
                id="endTime"
                {...register("technician.endTime")}
                type="text"
                placeholder="e.g 17:00"
                aria-invalid={technicianErrors?.endTime ? "true" : "false"}
              />
            </Field>
          </>
        )}
        <Button type="submit" className={`bg-(--color-primary)`}>
          {isSubmitting ? <Spinner /> : "Register"}
        </Button>
        <small>
          {`Already have an account?`} Please{" "}
          <Link href={"/login"} className="text-(--color-primary)">
            Login
          </Link>
        </small>
      </Card>
    </form>
  );
};

export default RegisterForm;
