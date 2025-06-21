import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
	return (
		<div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh]">
			<Spinner size="large" />
		</div>
	);
} 