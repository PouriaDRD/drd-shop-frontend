"use client";

import { Button, FieldGroup, Spinner } from "@/components/ui";

import { useRequestDepositForm } from "../../hooks";
import {
	DateField,
	ReceiptImageField,
	ReferenceNumberField,
	SenderCardNumberField,
	SenderNameField,
	TimeField,
	TrackingCodeField,
} from "../fields";
import { AmountField } from "../fields/amount-field";
import { NoteField } from "../fields/note-field";

interface Props {
	onSuccess?: () => void;
}

export function RequestDepositForm({ onSuccess }: Props) {
	const { form, submit, isPending } = useRequestDepositForm({
		onSuccess() {
			onSuccess?.();
		},
	});

	return (
		<form dir="rtl" onSubmit={submit} className="space-y-6">
			<FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{/* Amount */}
				<AmountField
					control={form.control}
					name="amount"
					label="مبلغ واریزی (به تومان)"
				/>

				{/* Sender Name */}
				<SenderNameField
					control={form.control}
					name="sender_name"
					label="نام صاحب کارت مبدا"
				/>

				{/* Card Number */}
				<SenderCardNumberField
					control={form.control}
					name="sender_card_number"
					label="شماره کارت مبدا"
				/>

				{/* Reference */}
				<ReferenceNumberField
					control={form.control}
					name="reference_number"
					label="شماره مرجع (اختیاری)"
				/>

				{/* Tracking */}
				<TrackingCodeField
					control={form.control}
					name="tracking_code"
					label="کد پیگیری (اختیاری)"
				/>

				{/* Date */}
				<DateField
					control={form.control}
					name="transaction_date"
					label="تاریخ تراکنش"
				/>

				{/* Time */}
				<TimeField
					control={form.control}
					name="transaction_time"
					label="ساعت تراکنش"
				/>

				{/* Note (full width) */}
				<div className="md:col-span-2">
					<NoteField
						control={form.control}
						name="note"
						label="توضیحات (اختیاری)"
					/>
				</div>

				{/* Receipt Upload (full width) */}
				<div className="md:col-span-2">
					<ReceiptImageField
						control={form.control}
						name="receipt_image"
						label="تصویر رسید پرداخت"
					/>
				</div>
			</FieldGroup>
			{/* Submit */}
			<div className="flex justify-end pt-2">
				<Button type="submit" disabled={isPending} className="min-w-40">
					{isPending ? <Spinner /> : "ثبت درخواست واریز"}
				</Button>
			</div>
		</form>
	);
}
