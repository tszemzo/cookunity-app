const CLIENT_BALANCE = 900;
const CONTRACTOR_BALANCE = 2000;

const fakeUnpaidJob = {
  id: 4,
  description: "work",
  price: 200,
  paid: null,
  paymentDate: null,
  createdAt: "2022-12-07T06:33:42.354Z",
  updatedAt: "2022-12-07T06:33:42.354Z",
  ContractId: 4,

  // Simulate the update method of the job model
  update: ({ paid, paymentDate }) => {
    fakeUnpaidJob.paid = paid;
    fakeUnpaidJob.paymentDate = paymentDate;
  }
};

const fakePaidJob = {
  id: 4,
  description: "work",
  price: 200,
  paid: true,
  paymentDate: "2022-12-08T06:33:42.354Z",
  createdAt: "2022-12-07T06:33:42.354Z",
  updatedAt: "2022-12-07T06:33:42.354Z",
  ContractId: 4
};

const fakeContract = {
  id: 4,
  terms: 'bla bla bla',
  status: 'in_progress',
  ClientId: 1,
  ContractorId: 5
}

const fakeClient = {
  id: 1,
  firstName: 'Harry',
  lastName: 'Potter',
  profession: 'Wizard',
  balance: CLIENT_BALANCE,
  type: 'client',

  // Simulate the update method of the profile model
  update: ({ balance }) => fakeClient.balance = balance,
}

const fakeContractor = {
  id: 5,
  firstName: 'Harry',
  lastName: 'Kane',
  profession: 'Footballer',
  balance: CONTRACTOR_BALANCE,
  type: 'contractor',

  // Simulate the update method of the profile model
  update: ({ balance }) => fakeContractor.balance = balance,
}

module.exports = {
  fakeUnpaidJob,
  fakePaidJob,
  fakeContract,
  fakeClient,
  fakeContractor,

  CLIENT_BALANCE,
  CONTRACTOR_BALANCE,
};
