;; Mission Integration Contract

(define-map missions
  { mission-id: uint }
  {
    agency: principal,
    resource-target: uint,
    start-block: uint,
    end-block: uint,
    status: (string-ascii 20)
  }
)

(define-data-var last-mission-id uint u0)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))

(define-public (register-mission (agency principal) (resource-target uint) (duration uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (let
      ((mission-id (+ (var-get last-mission-id) u1)))
      (map-set missions
        { mission-id: mission-id }
        {
          agency: agency,
          resource-target: resource-target,
          start-block: block-height,
          end-block: (+ block-height duration),
          status: "planned"
        }
      )
      (var-set last-mission-id mission-id)
      (ok mission-id)
    )
  )
)

(define-public (start-mission (mission-id uint))
  (let
    ((mission (unwrap! (map-get? missions { mission-id: mission-id }) err-not-found)))
    (asserts! (is-eq tx-sender (get agency mission)) err-unauthorized)
    (map-set missions
      { mission-id: mission-id }
      (merge mission { status: "active" })
    )
    (ok true)
  )
)

(define-public (complete-mission (mission-id uint))
  (let
    ((mission (unwrap! (map-get? missions { mission-id: mission-id }) err-not-found)))
    (asserts! (is-eq tx-sender (get agency mission)) err-unauthorized)
    (map-set missions
      { mission-id: mission-id }
      (merge mission { status: "completed" })
    )
    (ok true)
  )
)

(define-read-only (get-mission (mission-id uint))
  (map-get? missions { mission-id: mission-id })
)

