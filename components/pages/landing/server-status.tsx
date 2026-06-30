import { liveServers } from "./landing.data";
import { NetworkReadout } from "./network-readout";

export function ServerStatus() {
	return (
		<section id="servers" className="border-t bg-background">
			<div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
				<div>
					<p className="mb-2 text-xs text-muted-foreground">
						شفافیت زیرساخت
					</p>
					<h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
						وضعیت سرورها را خودت ببین،
						<br />
						نه اینکه فقط ادعا کنیم.
					</h2>
					<p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
						پینگ، بار سرور و وضعیت اتصال هر دیتاسنتر به‌صورت زنده
						روی همین صفحه به‌روزرسانی می‌شود؛ همان چیزی که در
						داشبورد کاربری هم می‌بینی.
					</p>

					<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
						{liveServers.map((s) => (
							<div
								key={s.id}
								className="rounded-lg border bg-card px-3 py-2.5">
								<p className="text-xs text-muted-foreground">
									{s.country}
								</p>
								<p className="text-[13px] font-medium text-foreground">
									{s.city}
								</p>
							</div>
						))}
					</div>
				</div>

				<NetworkReadout />
			</div>
		</section>
	);
}
