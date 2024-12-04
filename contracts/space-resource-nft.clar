;; Space Resource NFT Contract

(define-non-fungible-token space-resource uint)

(define-data-var last-token-id uint u0)

(define-map resource-data
  { resource-id: uint }
  {
    name: (string-ascii 64),
    location: (string-ascii 128),
    resource-type: (string-ascii 64),
    quantity: uint,
    discoverer: principal
  }
)

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-public (mint (name (string-ascii 64)) (location (string-ascii 128)) (resource-type (string-ascii 64)) (quantity uint))
  (let
    (
      (resource-id (+ (var-get last-token-id) u1))
    )
    (try! (nft-mint? space-resource resource-id tx-sender))
    (map-set resource-data
      { resource-id: resource-id }
      {
        name: name,
        location: location,
        resource-type: resource-type,
        quantity: quantity,
        discoverer: tx-sender
      }
    )
    (var-set last-token-id resource-id)
    (ok resource-id)
  )
)

(define-public (transfer (resource-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (try! (nft-transfer? space-resource resource-id sender recipient))
    (ok true)
  )
)

(define-read-only (get-resource-data (resource-id uint))
  (ok (map-get? resource-data { resource-id: resource-id }))
)

(define-read-only (get-owner (resource-id uint))
  (ok (nft-get-owner? space-resource resource-id))
)
