import asyncio
import logging
import grpc


async def run() -> None:
    async with grpc.aio.insecure_channel('localhost:50051') as channel:
        pass

if __name__ == '__main__':
    logging.basicConfig()
    asyncio.run(run())