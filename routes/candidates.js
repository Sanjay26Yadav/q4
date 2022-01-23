const config = require('config');
const _ = require('lodash');
const {Candidates} = require('../models/candidates');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const sorting = {}
  const filter = {}

  if(req.query.sortByName) sorting.name = 'asc';
  if(req.query.sortByEmail) sorting.email = 'asc';
  if(req.query.sortByPhone) sorting.phone = 'asc';
  if(req.query.sortByAddress) sorting.address = 'asc';
  if(req.query.sortByProfile) sorting.profile = 'asc';

  if(req.query.name) filter.name = req.query.name;
  if(req.query.email) filter.email = req.query.email;
  if(req.query.phone) filter.phone = req.query.phone;
  if(req.query.address) filter.address = req.query.address;
  if(req.query.profile) filter.profile = req.query.profile;

  const pageNo = req.query.pageNo || 0
  const limit = req.query.limit || 20
  const candidates = await Candidates.find(filter)
  .select(['name', 'phone', 'email', 'address', 'profile'])
  .limit(parseInt(limit))
  .skip(parseInt(limit * pageNo))
  .sort(sorting);

  res.send(candidates);

});

router.patch('/:id', async (req, res) => {
  try {
    let candidate = await Candidates.findOne({ _id: req.params.id });
    if(candidate && !!candidate._id) {
      let update = await Candidates.findOneAndUpdate({ _id: req.params.id }, _.pick(req.body, ['name', 'phone', 'email', 'address', 'profile']));
      res.status(201).send({data: update, msg: "Successfully updated."})
    } else {
      return res.status(400).send('invalid Candidate id.');
    }
  } catch {
    return res.status(500).send('unable to update.');
  }
});

router.post('/', async (req, res) => {
  let candidate = await Candidates.findOne({ email: req.body.email });
  if (candidate) return res.status(400).send('Candidate already registered.');
  candidate = new Candidates(_.pick(req.body, ['name', 'phone', 'email', 'address', 'profile']));
  await candidate.save();
  res.send(_.pick(candidate, ['_id', 'name', 'email']));
});

module.exports = router; 
