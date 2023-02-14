const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

const { 
  fakeUnpaidJob,
  fakePaidJob,
  fakeContract,
  fakeClient,
  fakeContractor,

  CLIENT_BALANCE,
  CONTRACTOR_BALANCE,
} = require('../mockData/jobs');

const jobsInterface = require('../../interfaces/jobs');
const contractsInterface = require('../../interfaces/contracts');
const profileInterface = require('../../interfaces/profile');

const PROFILE_ID = 1;
const JOB_ID = 4;

describe('controllers/jobs', () => {
  let jobsController;
  let jobsInterfaceStub;

  before(() => {
    // import file to test
    jobsController = require('../jobs');
  });

  afterEach(() => {
    if (jobsInterfaceStub) {
      jobsInterfaceStub.restore();
    }
  });

  describe('getUnpaidJobs', () => {
    it('should throw an error when no profile ID provided', async () => {
      try {
        await jobsController.getUnpaidJobs();
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Profile ID is required');
      }
    });

    it('should return all records', async () => {
      const mockedRecords = [fakeUnpaidJob];
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getUnpaidJobs').returns(mockedRecords);

      const records = await jobsController.getUnpaidJobs(PROFILE_ID);
      expect(jobsInterfaceStub.calledOnce).to.be.true;
      expect(records).to.equal(mockedRecords);
      expect(records).to.have.lengthOf(1);
    });
  });

  describe('payJob', () => {
    let contractsInterfaceStub;
    let clientInterfaceStub;
    let contractorInterfaceStub;

    afterEach(() => {
      if (contractsInterfaceStub) {
        contractsInterfaceStub.restore();
      }

      if (clientInterfaceStub) {
        clientInterfaceStub.restore();
      }

      if (contractorInterfaceStub) {
        contractorInterfaceStub.restore();
      }
    });

    it('should throw an error when no job ID provided', async () => {
      try {
        await jobsController.payJob();
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Job ID is required');
      }
    });

    it('should throw an error when no profile ID provided', async () => {
      try {
        await jobsController.payJob(JOB_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(err.message).to.eql('Profile ID is required');
      }
    });

    it('should throw an error when job was not found', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(null);

      try {
        await jobsController.payJob(JOB_ID, PROFILE_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(jobsInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql('Job not found');
      }
    });

    it('should throw an error when job was found but already paid', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(fakePaidJob);

      try {
        await jobsController.payJob(JOB_ID, PROFILE_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(jobsInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql('Job already paid');
      }
    });

    it('should throw an error when contract from job to pay was not found', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(fakeUnpaidJob);
      contractsInterfaceStub = sinon.stub(contractsInterface, 'getContractById').returns(null);

      try {
        await jobsController.payJob(JOB_ID, PROFILE_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(jobsInterfaceStub.calledOnce).to.be.true;
        expect(contractsInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql(`Contract from job ${JOB_ID} not found`);
      }
    });

    it('should throw an error when client associated to the contract from job to pay was not found', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(fakeUnpaidJob);
      contractsInterfaceStub = sinon.stub(contractsInterface, 'getContractById').returns(fakeContract);
      clientInterfaceStub = sinon.stub(profileInterface, 'getClientById').returns(null);

      try {
        await jobsController.payJob(JOB_ID, PROFILE_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(jobsInterfaceStub.calledOnce).to.be.true;
        expect(contractsInterfaceStub.calledOnce).to.be.true;
        expect(clientInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql(`Client from contract ${fakeContract.id} not found`);
      }
    });

    it('should throw an error when there are insufficient funds', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(fakeUnpaidJob);
      contractsInterfaceStub = sinon.stub(contractsInterface, 'getContractById').returns(fakeContract);
      clientInterfaceStub = sinon.stub(profileInterface, 'getClientById').returns({ ...fakeClient, balance: 0 });

      try {
        await jobsController.payJob(JOB_ID, PROFILE_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(jobsInterfaceStub.calledOnce).to.be.true;
        expect(contractsInterfaceStub.calledOnce).to.be.true;
        expect(clientInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql('Insufficient funds');
      }
    });

    it('should throw an error when the contractor from the contract was not found', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(fakeUnpaidJob);
      contractsInterfaceStub = sinon.stub(contractsInterface, 'getContractById').returns(fakeContract);
      clientInterfaceStub = sinon.stub(profileInterface, 'getClientById').returns(fakeClient);
      contractorInterfaceStub = sinon.stub(profileInterface, 'getContractorById').returns(null);

      try {
        await jobsController.payJob(JOB_ID, PROFILE_ID);
        expect('this should not have been called').to.be.false;
      } catch (err) {
        expect(jobsInterfaceStub.calledOnce).to.be.true;
        expect(contractsInterfaceStub.calledOnce).to.be.true;
        expect(clientInterfaceStub.calledOnce).to.be.true;
        expect(contractorInterfaceStub.calledOnce).to.be.true;
        expect(err.message).to.eql(`Contractor from contract ${fakeContract.id} not found`);
      }
    });

    it('should pay the job correctly', async () => {
      jobsInterfaceStub = sinon.stub(jobsInterface, 'getJobById').returns(fakeUnpaidJob);
      contractsInterfaceStub = sinon.stub(contractsInterface, 'getContractById').returns(fakeContract);
      clientInterfaceStub = sinon.stub(profileInterface, 'getClientById').returns(fakeClient);
      contractorInterfaceStub = sinon.stub(profileInterface, 'getContractorById').returns(fakeContractor);

      await jobsController.payJob(JOB_ID, PROFILE_ID);
      
      expect(fakeClient.balance).to.eql(CLIENT_BALANCE - fakeUnpaidJob.price);
      expect(fakeContractor.balance).to.eql(CONTRACTOR_BALANCE + fakeUnpaidJob.price);
      expect(fakeUnpaidJob.paid).to.be.true;
      expect(fakeUnpaidJob.paymentDate).to.not.be.null;

      expect(jobsInterfaceStub.calledOnce).to.be.true;
      expect(contractsInterfaceStub.calledOnce).to.be.true;
      expect(clientInterfaceStub.calledOnce).to.be.true;
      expect(contractorInterfaceStub.calledOnce).to.be.true;
    });
  });
});
