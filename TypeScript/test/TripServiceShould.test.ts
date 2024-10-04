import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";

describe("TripServiceShould", () => {
    it("should throw exception when user is not logged in", () => {
        const tripService = new TripService();
        const user = new User();
        jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(null);

        expect(() => tripService.getTripsByUser(user)).toThrowError(UserNotLoggedInException);
    });

    it("should return empty list when user is not friend", () => {
        const tripService = new TripService();
        const user = new User();
        const loggedUser = new User();
        jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(loggedUser);

        const trips = tripService.getTripsByUser(user);

        expect(trips).toHaveLength(0);
    });

    it("should return trip list when user is friend with logged in user", () => {
        const tripService = new TripService();
        const user = new User();
        const loggedUser = new User();
        user.addFriend(loggedUser);
        jest.spyOn(UserSession, "getLoggedUser").mockReturnValue(loggedUser);
        jest.spyOn(TripDAO, "findTripsByUser").mockReturnValue([new Trip()]);

        const trips = tripService.getTripsByUser(user);

        expect(trips).toHaveLength(1);
    });
});
