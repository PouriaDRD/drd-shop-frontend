"use client";

import Link from "next/link";

import { PdIcon } from "@/components/icons";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

import { LoginForm } from "../forms";

interface Props {
	onSuccess?: () => void;
}

function LoginCard({ onSuccess }: Props) {
	return (
		<Card className="mx-auto max-w-full sm:max-w-xs w-full bg-background ring-0 border-0">
			<CardHeader className="flex flex-col items-center">
				<PdIcon className="size-11" />
				<div className="text-center">
					<CardTitle>ورود</CardTitle>
					<CardDescription>
						برای ورود، اطلاعات زیر را وارد کنید!
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent>
				<LoginForm onSuccess={onSuccess} />
			</CardContent>

			<CardFooter className="flex flex-col items-center text-center text-xs text-muted-foreground">
				<Link href="/auth/register">
					حساب کاربری ندارید؟
					<Button variant={"link"} size={"xs"}>
						ثبت نام کنید
					</Button>
				</Link>
				با ورود در سایت، قوانین و مقررات سامانه را می‌پذیرید.
			</CardFooter>
		</Card>
	);
}

export default LoginCard;
