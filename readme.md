# Test task - Auction (simple)

## Installation and local launch

1. Clone this repo: `git clone https://github.com/andreibonnd/tt-auction`
2. Launch the [Redis](https://redislabs.com/try-free) locally or in cloud
3. Create `.env` with the environment variables listed below. Also, please, consider looking at `.env.defaults`
4. Run `npm install` in the root folder
5. Run `npm develop`

And you should be good to go

## Environment variables

| Name               | Description                           |
| ------------------ | ------------------------------------- |
| `REQUESTS_LIMIT`   | Limit of requests from one IP address |
| `BID_MIN`          | Minimum bid                           |
| `BID_MAX`          | Maximum bid                           |
| `REDIS_CONNECTION` | Redis connection string               |

## Requirements

The server should contain 2 services with the names: `bidder`, `auction`

1. Bidder
    - `Method`: GET
    - `Parameters`: IP, USER_AGENT
    - Response: JSON, contains two fields
        ```json
        {
            "url": "[URL-encoded random URL]",
            "bid": "[Random float number between 1 and 10]"
        }
        ```
2. Auction
    - `Method`: GET
    - `Parameters`: IP, USER_AGENT, PARTNER_ID
    - Logic:
        - The service will remotely call `bidder` service 3 times (**concurrently**), with the parameters passed, and redirect the user to the URL returned from the `bidder`, with the highest `bid`
        - _Capping._ The service will return a redirect up to 3 times per IP. i.e, after getting redirected 3 times, further calls will get to a blank page. (_Bonus._ Use `Redis` for this implementation)

Examples

1. Bidder
    - Request\
       http://127.0.0.1:3255/api/bidder?ip="1.0.0.1"&ua="Cloudflare/2009"
    - Response
        ```json
        {
            "url": "https://1.1.1.1/dns",
            "bid": "10"
        }
        ```
2. Auction
    - Request\
       http://127.0.0.1:3255/api/auction?ip="1.0.0.1"&ua="Cloudflare/2009"&pa="a1a1a11a1aa1"
    - Response\
       `302 Redirect` to the highest bidder URL
