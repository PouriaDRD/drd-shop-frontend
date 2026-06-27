"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getErrorMessage } from "@/features/shared/utils";

import { useRequestOtp } from "../mutations";
import { requestOtpSchema } from "../schemas";
import { RequestOtpData } from "../types";

interface Props {
	onSuccess: (data: RequestOtpData) => void;
}

export default function useRequestOtpForm(props: Props) {
	const { onSuccess } = props;
	const mutation = useRequestOtp();

	const form = useForm({
		resolver: zodResolver(requestOtpSchema),
		defaultValues: {
			phone_number: "",
		},
	});

	const submit = form.handleSubmit(async (values) => {
		mutation.mutate(values, {
			onSuccess: (res) => {
				if (!res.success) {
					toast.error(getErrorMessage(res.errors));
					return;
				}

				onSuccess(res.data);

				form.reset();

				const msg = `کد یکبار مصرف به ${values.phone_number} ارسال شد!`;
				toast.success(msg);
			},
			onError: () => {
				toast.error("خطا در ارسال کد");
			},
		});
	});

	return {
		form,
		submit,
		isPending: mutation.isPending,
	};
}
