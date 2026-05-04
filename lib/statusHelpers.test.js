import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  getReservationStatus,
  getQuoteStatus,
  getTripStatus,
  getStatusColor
} from './statusHelpers.js';

describe('statusHelpers', () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  describe('getReservationStatus', () => {
    it('should return "unknown" if no reservation is provided', () => {
      assert.strictEqual(getReservationStatus(null), 'unknown');
      assert.strictEqual(getReservationStatus(undefined), 'unknown');
    });

    it('should return "cancelled" if status is cancelled', () => {
      const reservation = { status: 'cancelled' };
      assert.strictEqual(getReservationStatus(reservation), 'cancelled');
    });

    it('should return status or "pending" if date is missing or invalid', () => {
      assert.strictEqual(getReservationStatus({ type: 'flight' }), 'pending');
      assert.strictEqual(getReservationStatus({ type: 'flight', status: 'confirmed' }), 'confirmed');
      assert.strictEqual(getReservationStatus({ type: 'hotel', details: { checkIn: 'invalid' } }), 'pending');
    });

    describe('Reservation Types', () => {
      it('should handle flight type with departureDate', () => {
        const reservation = {
          type: 'flight',
          status: 'confirmed',
          details: { departureDate: tomorrow.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'active');
      });

      it('should handle hotel type with checkIn', () => {
        const reservation = {
          type: 'hotel',
          status: 'confirmed',
          details: { checkIn: tomorrow.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'active');
      });

      it('should handle transfer type with pickupDate', () => {
        const reservation = {
          type: 'transfer',
          status: 'confirmed',
          details: { pickupDate: tomorrow.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'active');
      });
    });

    describe('Date Comparisons', () => {
      it('should return "completed" if date is in the past and status is confirmed', () => {
        const reservation = {
          type: 'flight',
          status: 'confirmed',
          details: { departureDate: yesterday.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'completed');
      });

      it('should return "expired" if date is in the past and status is not confirmed', () => {
        const reservation = {
          type: 'flight',
          status: 'pending',
          details: { departureDate: yesterday.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'expired');
      });

      it('should return "active" if date is today and status is confirmed', () => {
        const reservation = {
          type: 'flight',
          status: 'confirmed',
          details: { departureDate: today.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'active');
      });

      it('should return "active" if date is in the future and status is confirmed', () => {
        const reservation = {
          type: 'flight',
          status: 'confirmed',
          details: { departureDate: tomorrow.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'active');
      });

      it('should return original status if date is future and not confirmed', () => {
        const reservation = {
          type: 'flight',
          status: 'in review',
          details: { departureDate: tomorrow.toISOString() }
        };
        assert.strictEqual(getReservationStatus(reservation), 'in review');
      });
    });
  });

  describe('getQuoteStatus', () => {
    it('should return "unknown" if no quote is provided', () => {
      assert.strictEqual(getQuoteStatus(null), 'unknown');
    });

    it('should return status if cancelled or rejected', () => {
      assert.strictEqual(getQuoteStatus({ status: 'cancelled' }), 'cancelled');
      assert.strictEqual(getQuoteStatus({ status: 'rejected' }), 'rejected');
    });

    it('should return "active" if status is confirmed or accepted', () => {
      assert.strictEqual(getQuoteStatus({ status: 'confirmed' }), 'active');
      assert.strictEqual(getQuoteStatus({ status: 'accepted' }), 'active');
    });

    it('should return "expired" if valid_until is in the past and not confirmed', () => {
      const quote = {
        status: 'pending',
        valid_until: yesterday.toISOString()
      };
      assert.strictEqual(getQuoteStatus(quote), 'expired');
    });

    it('should not return "expired" if valid_until is in the past but status is confirmed', () => {
      const quote = {
        status: 'confirmed',
        valid_until: yesterday.toISOString()
      };
      assert.strictEqual(getQuoteStatus(quote), 'active');
    });

    it('should return current status if valid_until is in future', () => {
      const quote = {
        status: 'pending',
        valid_until: tomorrow.toISOString()
      };
      assert.strictEqual(getQuoteStatus(quote), 'pending');
    });
  });

  describe('getTripStatus', () => {
    it('should return "unknown" if no trip is provided', () => {
      assert.strictEqual(getTripStatus(null), 'unknown');
    });

    it('should return "cancelled" if status is cancelled', () => {
      assert.strictEqual(getTripStatus({ status: 'cancelled' }), 'cancelled');
    });

    it('should return "completed" if end_date is in the past', () => {
      const trip = {
        start_date: yesterday.toISOString(),
        end_date: yesterday.toISOString()
      };
      assert.strictEqual(getTripStatus(trip), 'completed');
    });

    it('should return "active" if today is between start and end date', () => {
      const trip = {
        start_date: yesterday.toISOString(),
        end_date: tomorrow.toISOString()
      };
      assert.strictEqual(getTripStatus(trip), 'active');
    });

    it('should return "active" if today is start date', () => {
      const trip = {
        start_date: today.toISOString(),
        end_date: tomorrow.toISOString()
      };
      assert.strictEqual(getTripStatus(trip), 'active');
    });

    it('should return "active" if today is end date', () => {
      const trip = {
        start_date: yesterday.toISOString(),
        end_date: today.toISOString()
      };
      assert.strictEqual(getTripStatus(trip), 'active');
    });

    it('should return "confirmed" if start date is in future and status is confirmed', () => {
      const trip = {
        status: 'confirmed',
        start_date: tomorrow.toISOString(),
        end_date: tomorrow.toISOString()
      };
      assert.strictEqual(getTripStatus(trip), 'confirmed');
    });

    it('should return "planning" if start date is in future and status is not confirmed', () => {
      const trip = {
        status: 'pending',
        start_date: tomorrow.toISOString(),
        end_date: tomorrow.toISOString()
      };
      assert.strictEqual(getTripStatus(trip), 'planning');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct color classes for known statuses', () => {
      assert.strictEqual(getStatusColor('confirmed'), 'bg-green-100 text-green-800');
      assert.strictEqual(getStatusColor('active'), 'bg-green-100 text-green-800');
      assert.strictEqual(getStatusColor('completed'), 'bg-blue-100 text-blue-800');
      assert.strictEqual(getStatusColor('pending'), 'bg-orange-100 text-orange-800');
      assert.strictEqual(getStatusColor('rejected'), 'bg-red-100 text-red-800');
      assert.strictEqual(getStatusColor('cancelled'), 'bg-gray-100 text-gray-800');
      assert.strictEqual(getStatusColor('expired'), 'bg-yellow-100 text-yellow-800');
    });

    it('should return default color classes for unknown status', () => {
      assert.strictEqual(getStatusColor('nonexistent'), 'bg-gray-100 text-gray-800');
    });
  });
});
