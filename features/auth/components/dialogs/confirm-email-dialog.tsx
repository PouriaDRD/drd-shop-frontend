import { Button, Dialog, DialogContent, DialogTrigger } from "@/components/ui";

import { OtpCard } from "../cards";

export function ConfirmEmailDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size={"xs"}>
					تایید ایمیل
				</Button>
			</DialogTrigger>

			<DialogContent dir="rtl" className="px-0 py-8">
				<OtpCard otpType="verify_email" />
			</DialogContent>
		</Dialog>
	);
}
