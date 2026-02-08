import { ReactNode } from 'react'
import { UseQueryResult } from '@tanstack/react-query' // QueryHandler의 Props 타입 정의
import { useTestQuery } from '@/entities/test/query/query'

// QueryHandler의 Props 타입 정의
interface QueryHandlerProps<TData, TError> {
	// TanStack Query 훅의 결과를 props로 직접 받습니다.
	queryResult: UseQueryResult<TData, TError>

	// 성공 시 렌더링될 내용. data가 TData임을 보장받습니다.
	children: (data: TData) => ReactNode

	loadingFallback?: ReactNode
	errorFallback?: ReactNode
}

/**
 * [책임 2] 로딩, 에러 상태에 따라 적절한 폴백을 렌더링하고,
 * 성공 시에만 children 함수에 data를 전달하여 렌더링을 위임하는 컴포넌트입니다.
 */
export function QueryHandler<TData, TError>({
	queryResult,
	children,
	loadingFallback,
	errorFallback,
}: QueryHandlerProps<TData, TError>) {
	// 구조 분해 할당으로 상태 추출
	const { data, isLoading, error } = queryResult

	// 기본 폴백 UI
	const defaultLoading = (
		<div className="text-gray-500 p-4 border rounded-lg bg-gray-50 animate-pulse">
			데이터를 불러오는 중입니다...
		</div>
	)
	const defaultError = (
		<div className="text-red-700 p-4 border border-red-300 rounded-lg bg-red-50">
			데이터 로드 중 오류가 발생했습니다.
		</div>
	)

	if (isLoading) {
		return loadingFallback || defaultLoading
	}

	if (error) {
		return errorFallback || defaultError
	}

	// isLoading이 false이고 error가 null이면 data는 TData 타입임을 확신할 수 있습니다.
	// 하지만 data가 여전히 undefined일 수 있는 예외적인 경우(keepPreviousData, initialData=undefined 등)를 위해
	// data가 유효한지 런타임 체크를 하는 것이 가장 안전합니다.
	if (data === undefined) {
		// 이 경우, 로딩이나 에러 상태가 아닌데 데이터가 없는 상태.
		// 예를 들어, 쿼리 키가 비활성화되었거나 초기 데이터가 없는 경우입니다.
		return loadingFallback || defaultLoading
	}

	// 성공 시, Render Prop 패턴을 사용하여 data를 전달
	return <>{children(data)}</>
}

const Test = () => {
	const queryResult = useTestQuery({ test: '1' })

	return (
		<QueryHandler
			queryResult={queryResult}
			loadingFallback={<div>로딩 중</div>}
		>
			{(data) => (
				<>
					{data.ok && <div>{data.data.test}</div>}
					{/* data가 TData 타입임을 확신할 수 있습니다. */}
				</>
			)}
		</QueryHandler>
	)
}

type FetcherProps<TData, TError, TParams> = {
	params: TParams
	query: (params: TParams) => UseQueryResult<TData, TError>
	queryOptions?: UseQueryResult<TData, TError>
}

const useFetcher = <TData, TError, TParams>({
	query,
	params,
}: FetcherProps<TData, TError, TParams>) => {
	const { data, isLoading, error } = query(params)

	const Fetcher = ({
		children,
		loadingFallback,
		errorFallback,
	}: {
		children: ReactNode
		loadingFallback?: ReactNode
		errorFallback?: ReactNode
	}) => {
		if (isLoading) {
			return loadingFallback || <div>1</div>
		}

		if (error) {
			return errorFallback || <div>2</div>
		}

		return <>{children}</>
	}

	return {
		Fetcher,
		data: data,
	}
}
